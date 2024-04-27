"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useUser } from "@clerk/clerk-react";

const Trips = () => {
  const [drivingTrips, setDrivingTrips] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/trips/", {
          userId: user?.id || null,
        });
        // Check if the response data is an array
          console.log(response.data)
        if (Array.isArray(response.data.allRides)) {
          setDrivingTrips(response.data.allRides);
        } else {
          // Handle the case when the response data is not an array
          console.error("Invalid response data format:", response.data);
          setDrivingTrips([]); // Set an empty array if the data is not valid
        }
        console.log("message: ", response.data);
      } catch (error) {
        // Handle the error here
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, [user]);

  const ridingTrips = [
    {
      departure: "2023-04-26T09:15:00",
      origin: "Miami, FL",
      destination: "Atlanta, GA",
      requestStatus: "Pending",
    },
    {
      departure: "2023-04-27T16:45:00",
      origin: "San Francisco, CA",
      destination: "Seattle, WA",
      requestStatus: "Approved",
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [availableSpots, setAvailableSpots] = useState(0);

  const handleManageTrip = (trip) => {
    setSelectedTrip(trip);
    setAvailableSpots(trip.riders);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTrip(null);
    setAvailableSpots(0);
  };

  const handleApprove = (request) => {
    if (availableSpots >= request.spots && !request.isHandled) {
      setAvailableSpots(availableSpots - request.spots);
      request.isHandled = true;
    }
  };

  const handleDecline = (request) => {
    if (!request.isHandled) {
      request.isHandled = true;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Driving
        </Typography>
        <Typography variant="body1" gutterBottom>
          This section displays the trips you are driving. You can manage rider
          requests and update trip details here.
        </Typography>
        <TableContainer component={Box}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Departure</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Riders</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivingTrips.map((trip, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(trip.departure).toLocaleString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell>{trip.origin}</TableCell>
                  <TableCell>{trip.destination}</TableCell>
                  <TableCell>{trip.riders}</TableCell>
                  <TableCell>
                    <Button
                      style={{ textTransform: "none" }}
                      variant="contained"
                      color="primary"
                      onClick={() => handleManageTrip(trip)}
                    >
                      Manage Trip
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={showModal} onClose={handleCloseModal}>
        <DialogTitle>Ride Requests</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Use this dialog to approve or deny requests made by other users.
          </Typography>
          <Typography variant="body2" gutterBottom>
            Available Spots: {availableSpots}
          </Typography>
          <TableContainer component={Box}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedTrip?.rideRequests.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell>{request.userName}</TableCell>
                    <TableCell>
                      <Button
                        style={{ textTransform: "none", marginRight: "8px" }}
                        variant="contained"
                        color="primary"
                        onClick={() => handleApprove(request)}
                        disabled={
                          availableSpots < request.spots || request.isHandled
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        style={{ textTransform: "none" }}
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDecline(request)}
                        disabled={request.isHandled}
                      >
                        Decline
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Riding
        </Typography>
        <Typography variant="body1" gutterBottom>
          This section shows the trips you have requested to ride with others.
          You can track the status of your requests here.
        </Typography>
        <TableContainer component={Box}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Departure</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Request Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ridingTrips.map((trip, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(trip.departure).toLocaleString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell>{trip.origin}</TableCell>
                  <TableCell>{trip.destination}</TableCell>
                  <TableCell>{trip.requestStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Trips;
