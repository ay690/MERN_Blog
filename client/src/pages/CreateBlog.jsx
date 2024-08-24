import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  // Input change handler
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: { xs: "90%", sm: "75%", md: "50%" },
            border: 3,
            borderRadius: 10,
            padding: { xs: 2, sm: 3 },
            margin: "auto",
            boxShadow: "10px 10px 20px #ccc",
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            padding={2}
            color="gray"
          >
            Create Your Post
          </Typography>
          <InputLabel
            sx={{
              mb: 1,
              mt: 2,
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{
              mb: 1,
              mt: 2,
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{
              mb: 1,
              mt: 2,
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              mt: 2,
              width: { xs: "100%", sm: "fit-content" },
              alignSelf: "center",
            }}
          >
            SUBMIT
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
