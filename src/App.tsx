import { useState } from "react";

const App = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/api/v1/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (data.result_url) {
        setShortenedUrl(data.result_url);
      } else {
        setError("Failed to shorten URL, please try again.");
      }
    } catch (error) {
      console.error("An unexpected error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shortenedUrl) {
      navigator.clipboard
        .writeText(shortenedUrl)
        .then(() => {
          alert("URL copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy URL to clipboard", err);
        });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between w-screen h-16 px-4 pt-0 bg-white text-gray sm:px-8 md:px-16">
          <div className="flex items-center ml-4 md:ml-16">
            <img
              className="h-auto"
              src="../src/assets/logo.svg"
              alt="Shortly Logo"
            ></img>
          </div>
          <div className="items-center hidden ml-4 mr-auto md:ml-16 md:flex">
            <ul className="flex space-x-4 font-bold">
              <li className="duration-300 hover:text-darkviolet">
                <a href="#"> Features </a>
              </li>

              <li className="duration-300 hover:text-darkviolet">
                <a href="#"> Pricing </a>
              </li>

              <li className="duration-300 hover:text-darkviolet">
                <a href="#"> Resources </a>
              </li>
            </ul>
          </div>

          {/*Bavigation Buttons */}
          <div className="flex items-center ml-auto space-x-4 ">
            <button className="font-bold duration-300 hover:text-darkviolet">
              Login
            </button>
            <button className="px-4 py-2 mx-4 font-bold text-white duration-300 border rounded-full bg-cyan hover:bg-opacity-70">
              Sign Up
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="px-4 pt-28 sm:px-8 md:px-16 lg:px-20">
          <div className="flex flex-col w-auto h-auto gap-10 px-4 md:flex-row sm:px-8 md:px-10 lg:px-12">
            <div className="flex flex-col justify-center flex-1 min-w-fit">
              <div className="mb-4">
                <p className="font-sans text-3xl font-bold md:leading-snug text-verydarkviolet md:h-40 md:text-5xl lg:text-7xl ">
                  More than just <br></br> shorter links
                </p>
              </div>
              <div className="mb-4">
                <p className="text-base font-semibold md:text-lg text-gray">
                  {" "}
                  Build your brand's recognition and get detailed
                  <br></br>
                  insights on how your links are performing.
                </p>
              </div>
              <div>
                <button className="w-full py-3 my-8 font-bold text-white duration-300 border-none rounded-full sm:w-56 bg-cyan hover:bg-opacity-70">
                  Get Started
                </button>
              </div>
            </div>

            <div className="flex justify-center flex-1 mt-10 md:justify-end md:mt-0">
              <img
                className="object-contain w-full max-w-xs md:max-w-sm lg:max-w-md"
                src="../src/assets/illustration-working.svg"
                alt="Working Illustration"
              ></img>
            </div>
          </div>

          {/*URL Shortener*/}
          <div className="relative flex justify-center mt-16 md:mt-28">
            <div className="relative z-10 w-full h-32 max-w-4xl overflow-hidden rounded-lg bg-darkviolet">
              <img
                className="absolute top-0 left-0 object-cover w-full h-full"
                src="../src/assets/bg-shorten-desktop.svg"
                alt="Background"
              ></img>
              <div className="relative z-20 flex items-center w-full h-full px-4 sm:px-8 md:px-12">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-grow p-4 rounded-lg text-gray"
                  placeholder="Shorten a link here..."
                ></input>
                <button
                  className="p-4 ml-4 font-bold text-white duration-300 rounded-lg bg-cyan hover:bg-opacity-70"
                  onClick={handleClick}
                >
                  {loading ? "Shortening..." : "Shorten It!"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*Display of Shortened URL */}
        {shortenedUrl && (
          <div className="px-4 mt-8 text-center">
            <p className="text-lg font-semibold text-darkviolet">
              Shortened URL:
            </p>
            <p
              onClick={copyToClipboard}
              className="cursor-pointer text-cyan hover:underline"
            >
              {shortenedUrl}
            </p>
          </div>
        )}

        {error && (
          <div className="px-4 mt-8 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>

      <div className="z-0 flex flex-col items-center gap-16 px-4 py-24 min-h-max bg-grayishviolet/10 bg-opacity-35">
        <div className="text-center">
          <div className="w-full max-w-screen-md mx-auto">
            <p className="text-3xl font-bold sm:text-4xl md:text-5xl text-darkviolet">
              {" "}
              Advanced Statistics{" "}
            </p>
          </div>
          <p className="mt-4 text-lg font-medium text-center text-grayishviolet">
            {" "}
            Track how your links are performing across the web with <br></br>
            our advanced stastistics dashboard.{" "}
          </p>
        </div>

        <div className="z-10 flex flex-col w-full max-w-screen-xl gap-8 p-10 mt-8 md:flex-row md:gap-12">
          {/* Brand Recognition Tab */}
          <div className="relative flex-1 h-64 p-6 bg-white rounded-lg md:p-8">
            <div className="absolute flex items-center justify-center w-20 h-20 rounded-full left-8 -top-8 bg-darkviolet">
              <img
                className="w-10 h-10"
                src="../src/assets/icon-brand-recognition.svg"
                alt="Icon"
              />
            </div>
            <p className="mt-16 text-xl font-bold text-darkviolet">
              {" "}
              Brand Recognition{" "}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-grayishviolet">
              Boost your brand recognition with each click. Generic links don't
              mean a thing. Branded links help instil confidence in your
              content.
            </p>
          </div>

          {/* Detailed Records Tab */}
          <div className="relative flex-1 h-64 p-6 bg-white rounded-lg md:mt-8 md:p-8">
            <div className="absolute flex items-center justify-center w-20 h-20 rounded-full left-8 -top-8 bg-darkviolet">
              <img
                className="w-10 h-10"
                src="../src/assets/icon-detailed-records.svg"
                alt="Icon"
              />
            </div>
            <p className="mt-16 text-xl font-bold text-darkviolet">
              {" "}
              Detailed Records{" "}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-grayishviolet">
              Gain insights into who is clicking your links. Knowing when and
              where people engage with your content helps inform better
              decisions.
            </p>
          </div>

          {/*Fully Customizable Tab */}
          <div className="relative flex-1 h-64 p-6 bg-white rounded-lg md:mt-16 md:p-8">
            <div className="absolute flex items-center justify-center w-20 h-20 rounded-full left-8 -top-8 bg-darkviolet">
              <img
                className="w-10 h-10"
                src="../src/assets/icon-fully-customizable.svg"
                alt="Icon"
              />
            </div>
            <p className="mt-16 text-xl font-bold text-darkviolet">
              {" "}
              Fully Customizable{" "}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-grayishviolet">
              Improve brand awareness and content discoverability through
              customizable links, supercharging audience engagement.
            </p>
          </div>
        </div>
      </div>

      {/* Boost Section */}
      <div className="relative flex flex-col items-center h-auto min-h-[20rem] place-items-center overflow-hidden bg-darkviolet">
        <img
          className="object-cover w-full h-[20rem] absolute top-0 left-0 md:h-[25rem] lg:h-[30rem]"
          src="../src/assets/bg-boost-desktop.svg"
          alt="Boost Background"
        />

        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center px-4">
          <p className="mb-6 text-3xl font-bold text-center text-white md:text-4xl lg:text-5xl">
            Boost your link today
          </p>

          <button className="px-6 py-3 font-bold text-white rounded-full bg-cyan hover:bg-opacity-70 md:px-8 md:py-4 lg:px-10 lg:py-5">
            Get Started
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative bg-verydarkviolet flex flex-col lg:flex-row lg:items-start justify-between gap-8 p-6 lg:gap-12 lg:p-28 min-h-[25rem]">
        <div className="flex items-start justify-center flex-shrink-0">
          <img
            className="w-24 md:w-auto lg:w-auto"
            src="../src/assets/logo2.svg"
          />
        </div>

        <div className="flex flex-col items-center flex-shrink-0 gap-4 md:gap-8 lg:items-start lg:flex-row lg:gap-12">
          <div className="flex flex-col items-center md:items-start">
            <h6 className="mb-4 text-lg font-semibold text-white md:text-xl">
              Features
            </h6>
            <ul className="text-sm leading-6 md:text-base text-gray">
              <li className="leading-10"> Link Shortening </li>
              <li className="leading-10"> Branded Links </li>
              <li className="leading-10"> Analytics </li>
            </ul>
          </div>

          <div className="flex flex-col items-center lg:items-start lg:mr-12">
            <h6 className="mb-4 text-lg font-semibold text-white md:text-xl">
              {" "}
              Resources
            </h6>
            <ul className="text-sm leading-6 md:text-base text-gray">
              <li className="leading-10"> Blog </li>
              <li className="leading-10"> Developers </li>
              <li className="leading-10"> Support </li>
            </ul>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <h6 className="mb-4 text-lg font-semibold text-white md:text-xl">
              {" "}
              Company{" "}
            </h6>
            <ul className="text-sm leading-6 md:text-base text-gray">
              <li className="leading-10"> About </li>
              <li className="leading-10"> Our Team </li>
              <li className="leading-10"> Careers </li>
              <li className="leading-10"> Contact </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center flex-shrink-0 mt-4 space-x-4 lg:mt-0">
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-auto lg:h-auto"
            src="../src/assets/icon-facebook.svg"
            alt="Facebook"
          />
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-auto lg:h-auto"
            src="../src/assets/icon-twitter.svg"
            alt="Twitter"
          />
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-auto lg:h-auto"
            src="../src/assets/icon-pinterest.svg"
            alt="Pinterest"
          />
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-auto lg:h-auto"
            src="../src/assets/icon-instagram.svg"
          />
        </div>
      </div>
    </>
  );
};

export default App;
