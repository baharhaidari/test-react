import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Timeline.css";

const Timeline = () => {
  const { t } = useTranslation();
  const timelineData = t("ABOUT.timeline", { returnObjects: true });

  const [searchTerm, setSearchTerm] = useState("");

  const getDate = (item) => {
    const formattedDate = `${item.startDate} - ${item.endDate}`;
    return formattedDate;
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = timelineData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="search-container">
        <label>{t("ABOUT.SEARCH.label")}: </label>
        <input
          type="text"
          placeholder={t("ABOUT.SEARCH.placeholder")}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="timeline">
        {filteredData.map((item, index) => (
          <div
            className={`container ${index % 2 === 0 ? "left" : "right"} ${
              index % 2 === 0 ? "animate-left" : "animate-right"
            }`}
            key={index}
          >
            <div className="content">
              <h2>
                <span>{getDate(item)}</span>
              </h2>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Timeline;
