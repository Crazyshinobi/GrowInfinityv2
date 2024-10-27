import React, { useState } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchData } from "../../../hooks/useFetchData";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";

export const AddProperty = () => {
  document.title = "Add Property";

  // Fetch categories and amenities data
  const {
    data: categoriesData,
    error: categoryError,
    loading: categoryLoading,
    refetch: refetchCategories,
  } = useFetchData("http://localhost:4000/api/v1/category");

  const categories = categoriesData?.category || [];

  const {
    data: amenitiesData,
    error: amenitiesError,
    loading: amenitiesLoading,
    refetch: refetchAmenities,
  } = useFetchData("http://localhost:4000/api/v1/amenities");

  const amenities = amenitiesData?.amenity || [];

  // State to manage form data
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    location: "",
    address: "",
    description: "",
    city: "",
    state: "",
    pincode: "",
    videoLink: "",
    constructionStatus: "",
    parking: "",
    furnishType: "",
    societyAmenities: [],
    flatAmenities: [],
    locationAdvantages: [],
  });

  // State to track uploaded images and brochure
  const [uploadedImages, setUploadedImages] = useState([]);
  const [brochure, setBrochure] = useState(null);

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle select changes
  const handleSelectChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (event, type) => {
    const { name, checked } = event.target;
    setFormData((prevData) => {
      const currentItems = prevData[type];
      if (checked) {
        return { ...prevData, [type]: [...currentItems, name] };
      } else {
        return {
          ...prevData,
          [type]: currentItems.filter((item) => item !== name),
        };
      }
    });
  };

  // Handler for uploading images
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedImages((prevImages) => [...prevImages, ...files]);
  };

  // Handler for uploading brochure
  const handleBrochureUpload = (event) => {
    const file = event.target.files[0];
    setBrochure(file);
  };

  // Function to display image previews
  const renderImagePreviews = () => {
    return uploadedImages.map((image, index) => (
      <img
        key={index}
        src={URL.createObjectURL(image)}
        alt="Preview"
        style={{ width: "100px", marginRight: "10px", marginBottom: "10px" }}
      />
    ));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const allSelectedAmenities = [
      ...formData.societyAmenities,
      ...formData.flatAmenities,
      ...formData.locationAdvantages,
    ];

    const formDataToSend = new FormData();

    // Append form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (
        key === "societyAmenities" ||
        key === "flatAmenities" ||
        key === "locationAdvantages"
      ) {
        allSelectedAmenities.forEach(
          (item) => formDataToSend.append("amenities", item) // Fixed from amenity to amenities
        );
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => formDataToSend.append(key, item));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append uploaded images
    uploadedImages.forEach((image) => {
      formDataToSend.append("propertyImages", image);
    });

    // Append the brochure if it exists
    if (brochure) {
      formDataToSend.append("brochure", brochure);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/property",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Property added successfully!");
        // Reset form...
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property.");
    }
  };

  return (
    <>
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h2 className="text-xl font-bold p-2 text-center sm:text-left">
            Add Property
          </h2>
          <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap my-5">
                {/* Property Category */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <FormControl color="secondary" size="small" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Property Category*
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="category"
                      value={formData.category}
                      onChange={handleSelectChange}
                      label="Enter Amenity Type*"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                {/* Property Name */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Property Name*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>

                {/* Property Location */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Property Location*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>

                {/* Property Address */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Property Address*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>

                {/* Property Description */}
                <div className="w-full mb-4 p-2">
                  <TextField
                    label="Enter Property Description*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    fullWidth
                  />
                </div>

                {/* City */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Property City*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>

                {/* State */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Property State*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>

                {/* Pincode */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Property Pincode*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>

                {/* Video Link */}
                <div className="w-full sm:w-1/2 mb-4 p-2">
                  <TextField
                    label="Enter Youtube Video Link*"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    name="videoLink"
                    value={formData.videoLink}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>

                {/* Construction Status */}
                <div className="w-full mb-4 p-2">
                  <FormControl>
                    <FormLabel color="secondary">Construction Status</FormLabel>
                    <RadioGroup
                      row
                      name="constructionStatus"
                      value={formData.constructionStatus}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Ready to move"
                        control={<Radio color="secondary" />}
                        label="Ready to move"
                      />
                      <FormControlLabel
                        value="Under Construction"
                        control={<Radio color="secondary" />}
                        label="Under Construction"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className="w-full mb-4 p-2">
                  <FormControl>
                    <FormLabel color="secondary">Parking</FormLabel>
                    <RadioGroup
                      row
                      name="parking"
                      value={formData.parking}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Covered"
                        control={<Radio color="secondary" />}
                        label="Covered"
                      />
                      <FormControlLabel
                        value="Uncovered"
                        control={<Radio color="secondary" />}
                        label="Uncovered"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                {/* Furnish Type */}
                <div className="w-full mb-4 p-2">
                  <FormControl>
                    <FormLabel color="secondary">Furnish Type</FormLabel>
                    <RadioGroup
                      row
                      name="furnishType"
                      value={formData.furnishType}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Fully Furnished"
                        control={<Radio color="secondary" />}
                        label="Fully Furnished"
                      />
                      <FormControlLabel
                        value="Semi Furnished"
                        control={<Radio color="secondary" />}
                        label="Semi Furnished"
                      />
                      <FormControlLabel
                        value="Unfurnished"
                        control={<Radio color="secondary" />}
                        label="Unfurnished"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                {/* Society Amenities */}
                <div className="w-full mb-4 p-2">
                  <FormControl component="fieldset">
                    <FormLabel color="secondary">Society Amenities</FormLabel>
                    <div className="flex flex-wrap">
                      {amenities
                        .filter((amenity) => amenity.type === "society_amenity")
                        .map((amenity) => (
                          <FormControlLabel
                            key={amenity._id}
                            control={
                              <Checkbox
                                color="secondary"
                                name={amenity.name}
                                checked={formData.societyAmenities.includes(
                                  amenity.name
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "societyAmenities")
                                }
                              />
                            }
                            label={amenity.name}
                          />
                        ))}
                    </div>
                  </FormControl>
                </div>

                {/* Flat Amenities */}
                <div className="w-full mb-4 p-2">
                  <FormControl component="fieldset">
                    <FormLabel color="secondary">Flat Amenities</FormLabel>
                    <div className="flex flex-wrap">
                      {amenities
                        .filter((amenity) => amenity.type === "flat_amenity")
                        .map((amenity) => (
                          <FormControlLabel
                            key={amenity._id}
                            control={
                              <Checkbox
                                color="secondary"
                                name={amenity.name}
                                checked={formData.flatAmenities.includes(
                                  amenity.name
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "flatAmenities")
                                }
                              />
                            }
                            label={amenity.name}
                          />
                        ))}
                    </div>
                  </FormControl>
                </div>

                {/* Location Advantages */}
                <div className="w-full mb-4 p-2">
                  <FormControl component="fieldset">
                    <FormLabel color="secondary">Location Advantages</FormLabel>
                    <div className="flex flex-wrap">
                      {amenities
                        .filter(
                          (amenity) => amenity.type === "location_advantages"
                        )
                        .map((amenity) => (
                          <FormControlLabel
                            key={amenity._id}
                            control={
                              <Checkbox
                                color="secondary"
                                name={amenity.name}
                                checked={formData.locationAdvantages.includes(
                                  amenity.name
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(e, "locationAdvantages")
                                }
                              />
                            }
                            label={amenity.name}
                          />
                        ))}
                    </div>
                  </FormControl>
                </div>

                {/* Brochure Upload */}
                <div className="w-full mb-4 p-2">
                  <FormControl component="fieldset">
                    <FormLabel id="brochure-upload">
                      Upload Brochure (PDF)
                    </FormLabel>
                    <input
                      accept="application/pdf"
                      style={{ display: "none" }}
                      id="brochure-upload-input"
                      type="file"
                      onChange={handleBrochureUpload}
                    />
                    <label htmlFor="brochure-upload-input">
                      <Button
                        variant="outlined"
                        component="span"
                        size="small"
                        style={{ textTransform: "none" }}
                      >
                        Choose Brochure
                      </Button>
                    </label>
                    <Typography variant="body2">
                      {brochure ? brochure.name : "No brochure selected"}
                    </Typography>
                  </FormControl>
                </div>

                {/* Image Upload */}
                <div className="w-full mb-4 p-2">
                  <FormControl component="fieldset">
                    <FormLabel id="image-upload">
                      Upload Property Images
                    </FormLabel>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="image-upload-input"
                      type="file"
                      multiple
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="image-upload-input">
                      <Button
                        variant="outlined"
                        component="span"
                        size="small"
                        style={{ textTransform: "none" }}
                      >
                        Choose Images
                      </Button>
                    </label>

                    <Typography variant="body2">
                      {uploadedImages.length} images selected
                    </Typography>

                    <div className="flex flex-wrap mt-2">
                      {renderImagePreviews()}
                    </div>
                  </FormControl>
                </div>

                {/* Submit Button */}
                <div className="p-2">
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddCircleIcon />}
                    type="submit"
                    size="small"
                    style={{ textTransform: "none" }}
                  >
                    Add Property
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
