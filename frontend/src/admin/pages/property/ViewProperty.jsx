import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AdminLayout } from "../../components/AdminLayout";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFetchData } from "../../../hooks/useFetchData";
export const ViewProperty = () => {
  document.title = "View Property";

  const apiUrl = `${process.env.BASE_URL}/api/v1/property`;

  const { data, loading, error, refetch } = useFetchData(apiUrl);
  const properties = data.properties;

  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Handle pagination change (page number)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (propertyId) => {
    try {
      const deleteUrl = apiUrl + `/${propertyId}`;
      const response = await axios.delete(deleteUrl);

      if (response.data.success) {
        refetch();
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <>
      <ToastContainer />
      <AdminLayout />
      <div className="p-4 sm:ml-64">
        <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200 mt-20">
          <div className="flex items-center justify-between pb-6 border-b">
            <h2 className="text-2xl font-bold text-center sm:text-left text-blue-600">
              View Property
            </h2>
            <div className="flex gap-4">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={refetch}
                sx={{ textTransform: "none" }}
              >
                Refresh
              </Button>
            </div>
          </div>
          <Paper sx={{ marginTop: "20px" }}>
            {loading && (
              <div className="flex justify-center py-10">
                <CircularProgress size="large" color="secondary" />
              </div>
            )}
            {error && (
              <div className="text-center text-red-500 py-4">
                <Typography variant="h6">Error: {error}</Typography>
              </div>
            )}
            {properties && (
              <>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow className="bg-gray-100">
                        <TableCell>S No.</TableCell>
                        <TableCell>Property Category</TableCell>
                        <TableCell>Property Name</TableCell>
                        <TableCell>Property Location</TableCell>
                        <TableCell>Property Description</TableCell>
                        <TableCell>Property Address</TableCell>
                        <TableCell>Parking</TableCell>
                        <TableCell>Furnish Type</TableCell>
                        <TableCell>Flat Amenity</TableCell>
                        <TableCell>Society Amenity</TableCell>
                        <TableCell>Location Advantages</TableCell>
                        <TableCell>Property Images</TableCell>
                        <TableCell>Property Brochure</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {properties
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((property, i) => (
                          <TableRow
                            key={property._id}
                            sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
                          >
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{property.category?.name}</TableCell>
                            <TableCell>{property.name}</TableCell>
                            <TableCell>{property.location}</TableCell>
                            <TableCell>{property.description}</TableCell>
                            <TableCell>
                              {property.address +
                                ", " +
                                property.city +
                                ", " +
                                property.state +
                                ", " +
                                property.pincode}
                            </TableCell>
                            <TableCell>{property.parking}</TableCell>
                            <TableCell>{property.furnishType}</TableCell>
                            <TableCell>
                              {property.amenities
                                .filter((item) => item.type === "flat_amenity")
                                .map((amenityItem, i) => (
                                  <span key={i}>{amenityItem.name + " "}</span>
                                ))}
                            </TableCell>
                            <TableCell>
                              {property.amenities
                                .filter(
                                  (item) => item.type === "society_amenity"
                                )
                                .map((amenityItem, i) => (
                                  <span key={i}>{amenityItem.name + " "}</span>
                                ))}
                            </TableCell>
                            <TableCell>
                              {property.amenities
                                .filter(
                                  (item) => item.type === "location_advantages"
                                )
                                .map((amenityItem, i) => (
                                  <span key={i}>{amenityItem.name + " "}</span>
                                ))}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-3">
                                {property.propertyImages?.map(
                                  (element, index) => (
                                    <img
                                      key={index}
                                      src={`${process.env.BASE_URL}/${element}`}
                                      alt={`Image ${index + 1}`}
                                      style={{
                                        height: "100px",
                                        width: "150px",
                                        objectFit: "contain",
                                        objectPosition: "center",
                                        borderRadius: "8px",
                                        boxShadow:
                                          "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                      }}
                                    />
                                  )
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {property.brochure?.split("\\").pop()}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2 justify-center">
                                <Link
                                  to={`/admin/dashboard/update-property/${property._id}`}
                                >
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    sx={{ textTransform: "none" }}
                                  >
                                    Edit
                                  </Button>
                                </Link>
                                <Button
                                  onClick={() => handleDelete(property._id)}
                                  variant="contained"
                                  size="small"
                                  color="error"
                                  startIcon={<DeleteIcon />}
                                  sx={{ textTransform: "none" }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={properties.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    ".MuiTablePagination-toolbar": {
                      justifyContent: "center",
                    },
                    ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
                      {
                        fontSize: "0.9rem",
                      },
                  }}
                />
              </>
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};
