'use client';

import { Fragment, memo, useEffect, useState } from 'react';
import {
  FaBirthdayCake,
  FaBuilding,
  FaEnvelope,
  FaGithub,
  FaMapMarkerAlt,
  FaUser,
} from 'react-icons/fa';

interface AboutMeProps {
  onDataLoaded: () => void;
}

export default memo(function AboutMeSection({ onDataLoaded }: AboutMeProps) {
  const [userData, setUserData] = useState<UserProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUserData(data);
        setLoading(false);
        onDataLoaded();
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [onDataLoaded]);

  if (loading) {
    return <div className="text-center text-mint">Loading user data...</div>;
  }

  return (
    <section
      id="about-me"
      className="py-16 bg-dark text-grayLight min-h-svh flex items-center"
    >
      <div className="container mx-auto px-4 space-y-12 max-w-5xl">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-mint text-center">About Me</h2>

        {/* Introduction */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {userData?.intro.split('\n').map((line, index) => {
            if (index === 0 || index === 1) {
              return (
                <p
                  key={line}
                  className="text-3xl font-bold text-gray-300 mb-4 flex items-center space-x-2"
                >
                  {line}
                </p>
              );
            } else {
              return (
                <Fragment key={line}>
                  <br />
                  <p className="text-lg leading-relaxed text-gray-400 whitespace-pre-line">
                    {line}
                  </p>
                </Fragment>
              );
            }
          })}
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-300">
          {/* Name */}
          <div className="flex items-center space-x-4">
            <FaUser className="text-mint text-xl" />
            <div>
              <h3 className="text-lg font-semibold text-mint">Name</h3>
              <p>{userData?.name}</p>
            </div>
          </div>

          {/* Birthday */}
          <div className="flex items-center space-x-4">
            <FaBirthdayCake className="text-mint text-xl" />
            <div>
              <h3 className="text-lg font-semibold text-mint">Birthday</h3>
              <p>{userData?.birthday}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-mint text-xl" />
            <div>
              <h3 className="text-lg font-semibold text-mint">Address</h3>
              <p>{userData?.address}</p>
            </div>
          </div>

          {/* Company */}
          <div className="flex items-center space-x-4">
            <FaBuilding className="text-mint text-xl" />
            <div>
              <h3 className="text-lg font-semibold text-mint">Company</h3>
              <p>{userData?.company}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-mint text-xl" />
            <div>
              <h3 className="text-lg font-semibold text-mint">Email</h3>
              <a
                href={`mailto:${userData?.email}`}
                className="hover:underline hover:text-gray-200"
              >
                {userData?.email}
              </a>
            </div>
          </div>

          {/* GitHub */}
          <div className="flex items-center space-x-4">
            <FaGithub className="text-mint text-xl" />
            <div>
              <h3 className="text-lg font-semibold text-mint">GitHub</h3>
              <a
                href={userData?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-gray-200"
              >
                {userData?.github}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
