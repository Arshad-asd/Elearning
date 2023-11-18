import React from "react";

const Playlist = () => {
  return (
    <div className="blog-single bg-gray-100 pt-20 pb-20">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12 mb-15">
            <article className="article bg-white shadow-md rounded-md overflow-hidden mt-15 mb-15">
              <div className="article-img">
                <img
                  src="https://www.bootdey.com/image/800x350/87CEFA/000000"
                  title=""
                  alt=""
                  className="w-full"
                />
              </div>
              <div className="article-title p-8">
                <h6 className="uppercase">
                  <a href="#" className="text-blue-500">
                    Lifestyle
                  </a>
                </h6>
                <h2 className="text-2xl font-semibold">
                  They Now Bade Farewell To The Kind But Unseen People
                </h2>
                <div className="flex items-center mt-4">
                  <div className="avatar">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      title=""
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="media-body ml-4">
                    <label className="font-semibold text-gray-600">
                      Rachel Roth
                    </label>
                    <span className="text-gray-500 text-sm">26 FEB 2020</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="w-full lg:w-4/12 mb-15 px-4 lg:pl-0">
            {/* Author */}
            <div className="widget widget-author bg-white shadow-md rounded-md overflow-hidden mt-15 mb-15">
              <div className="card bg-white p-4 rounded-md shadow-md mb-4">
                <div className="flex">
                  {/* Video Thumbnail */}
                  <div className="flex-shrink-0 mr-4">
                    <img
                      className="w-32 h-24 object-cover"
                      src="https://placekitten.com/320/240"
                      alt="Video Thumbnail"
                    />
                  </div>

                  {/* Video Details */}
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-2">Video Title</div>
                    {/* Watch Time */}
                    <div className="flex items-center mt-2">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12h14m-7 7l7-7-7-7"
                        ></path>
                      </svg>
                      <span className="text-gray-500 text-sm">
                        Watched 30 minutes ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-white p-4 rounded-md shadow-md mb-4">
                <div className="flex">
                  {/* Video Thumbnail */}
                  <div className="flex-shrink-0 mr-4">
                    <img
                      className="w-32 h-24 object-cover"
                      src="https://placekitten.com/320/240"
                      alt="Video Thumbnail"
                    />
                  </div>

                  {/* Video Details */}
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-2">
                      Another Video Title
                    </div>
                    {/* Watch Time */}
                    <div className="flex items-center mt-2">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12h14m-7 7l7-7-7-7"
                        ></path>
                      </svg>
                      <span className="text-gray-500 text-sm">
                        Watched 45 minutes ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add more cards as needed */}
            </div>
            {/* End Author */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
