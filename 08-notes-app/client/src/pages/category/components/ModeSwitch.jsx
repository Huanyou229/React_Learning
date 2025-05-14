import React, { useState, useEffect } from "react";
import { getCategories } from "@/api/categoryApi";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import CategoryGroup from "@/pages/category/components/CategoryGroup";
import CategoryList from "@/pages/category/components/CategoryList";

dayjs.extend(utc);
const ModeSwitch = ({ mode }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return mode === "grid" ? (
    <CategoryGroup categories={categories} />
  ) : (
    <CategoryList categories={categories} />
  );
};
ModeSwitch.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default ModeSwitch;
