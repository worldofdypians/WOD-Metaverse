import React from "react";
import "./_partnerform.scss";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import styled from "styled-components";
import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import uploadIcon from "./assets/uploadIcon.svg";
import uploadedIcon from "./assets/uploadedIcon.svg";
import xMark from "./assets/xMark.svg";
import ReCaptchaV2 from "react-google-recaptcha";
import { useRef } from "react";
import validateInfo from "./validateInfo";
import axios from "axios";

const StyledTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#fff',
      fontFamily: "Poppins"
    },
    '& .MuiInputLabel-root': {
      color: '#fff',
      fontFamily: "Poppins",
      zIndex: '2'
    },
    '& .MuiFormHelperText-root': {
      fontFamily: "Poppins"
    },
    '& .MuiSelect-select': {
      color: '#fff',
      fontFamily: "Poppins",
      zIndex: "1"
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#AAA5EB',
      fontFamily: "Poppins",
      color: "#fff",
      background: "#272450",
      borderRadius: "8px"
    },
    '& .MuiOutlinedInput-input': {
        zIndex: '1',
        color: '#fff',
        fontFamily: 'Poppins'
      },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#AAA5EB',
        fontFamily: "Poppins",
        background: "#272450",
        borderRadius: "8px",
      },
      '&.Mui-focused fieldset': {
        borderColor: '#AAA5EB',
        fontFamily: "Poppins",
        color: "#fff",
        background: "#272450",
        borderRadius: "8px"
      },
    },
  });


const PartnerForm = () => {
  const initialValues = {
    name: "",
    email: "",
    company_name: "",
    company_size: "",
    description: "",
    interests: "",
  };

  var productsArray = [];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const recaptchaRef = useRef(null);
  const [success, setSuccess] = useState(false)



  const handleChange = async (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const addProducts = (product) => {
    if (productsArray.includes(product)) {
      const index = productsArray.indexOf(product);
      productsArray.splice(index, 1);
    } else {
      productsArray.push(product);
    }
  };

  const onFileChange = (event) => {
    const fileTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];

    const file = event.target.files[0]
    const reader = new FileReader();
    const testImage = new Image();

     reader.onload = function () {
      if (reader !== null && typeof reader.result == "string") {
        testImage.src = reader.result;
      }
    };
    reader.readAsDataURL(file);


    testImage.onload = async function () {
      if (fileTypes.includes(event.target.files[0].type)) {
      if (event.target.files && event.target.files[0]) {
        if (event.target.files[0].size < 5000000) {
          setSelectedFile(reader.result);
          console.log(reader.result);
        } else alert("File size too big");
      }
    } else {
      alert("Image type not supported");
    }
    }
  };

  const handleChangeBg = (event) => {
    if (selectedFile) {
      setSelectedFile(null);
      event.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validateInfo(values, productsArray.join()));

    if (Object.keys(validateInfo(values, productsArray.join())).length === 0) {
      const captchaToken = await recaptchaRef.current.executeAsync();
      const data = {
        email: values.email,
        name: values.name,
        company_name: values.company_name,
        company_size: values.company_size,
        description: values.description,
        interests: productsArray.join(),
        image: selectedFile,
        recaptcha: captchaToken,
      };
      if (
        values.name !== "" &&
        values.description !== "" &&
        data.interests !== "" &&
        values.email !== ""
      ){
        const send = await axios
          .post("https://api-mail.dyp.finance/api/wod/business", data)
          .then(function(result) {
            return result.data;
          })
          .catch(function (error) {
            console.error(error);
          });
        if (send.status === 1) {
          setSuccess(true);
          alert('success')
        } else {
          setSuccess(false);
          alert('Fail')
        }
      }else{
      }
      recaptchaRef.current.reset();
      setValues({ ...initialValues });
      setSelectedFile(null);

    }
  };


  return (
    <div className="container-fluid d-flex px-0 align-items-center justify-content-center">
      <div className="partner-main-wrapper py-5 px-0 w-100 d-flex align-items-center flex-column gap-4">
        <div className="d-flex flex-column">
          <h6 className="partner-title font-organetto">Crate your own world</h6>
          <h6
            className="partner-title font-organetto"
            style={{ color: "#8C56FF" }}
          >
            The possibilties are endless.
          </h6>
        </div>
        <p className="partner-desc w-75">
          The World of Dypians (WoD) is a massive multiplayer online
          role-playing game that is set in a vast digital environment. It offers
          a rich and engaging experience where players can interact with others,
          complete quests, and engage in battles. WoD combines fantasy and
          blockchain technology to create a dynamic virtual world where players
          can form communities, create content, and interact with each other.
          The ultimate goal is to create a lively virtual world where players
          can engage in meaningful experiences.
        </p>
        <div className="partner-form-wrapper col-12 col-lg-4 gap-3 p-3 d-flex flex-column">
          <h6 className="partner-form-title font-organetto">Start creating your own world</h6>
          <StyledTextField
            error={errors.name ? true : false}
            size="small"
            label="Contact name"
            id="name"
            name="name"
            value={values.name}
            helperText={errors.name}
            required
            onChange={(e) => {
              handleChange(e);
            }}
            sx={{ width: "100%" }}
          />
          <StyledTextField
            error={errors.email ? true : false}
            size="small"
            label="Email address"
            id="email"
            name="email"
            value={values.email}
            helperText={errors.email}
            required
            onChange={(e) => {
              handleChange(e);
            }}
            sx={{ width: "100%" }}
          />
          <div className="d-flex align-items-center justify-content-between gap-2">
            <StyledTextField
              error={errors.company_name ? true : false}
              size="small"
              label="Company name"
              id="company_name"
              name="company_name"
              value={values.company_name}
              helperText={errors.company_name}
              onChange={(e) => {
                handleChange(e);
              }}
              sx={{ width: "100%" }}
            />
            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{fontFamily: "Poppins", color: "#fff"}}>Company size</InputLabel>
              <StyledSelect
                sx={{ borderRadius: "8px", fontFamily: "Poppins", background: "#272450", border: "1px solid white", color: "#fff" }}
                size="small"
                labelId="demo-simple-select-label"
                id="company_size"
                name="company_size"
                value={values.company_size}
                label="Company size"
                onChange={handleChange}
              >
              </StyledSelect>
              {errors.company_size && (
                  <FormHelperText>{errors.company_size}</FormHelperText>
                  )}
            </FormControl> */}

<StyledTextField
              error={errors.company_size ? true : false}
              size="small"
              label="Company size"
              id="company_size"
              name="company_size"
              value={values.company_size}
              helperText={errors.company_size}
              select
              onChange={(e) => {
                handleChange(e);
              }}
              sx={{ width: "100%" }}
            > 
                        <MenuItem sx={{background: "#080b2a", color: "#AAA5EB", fontFamily: "Poppins"}}  value={"Self-Employed"}>Ten</MenuItem>
                  <MenuItem sx={{background: "#080b2a", color: "#AAA5EB", fontFamily: "Poppins"}}  value={"1 - 10 Employees"}>1 - 10 Employees</MenuItem>
                  <MenuItem sx={{background: "#080b2a", color: "#AAA5EB", fontFamily: "Poppins"}}  value={"11 - 100 Employees"}>11 - 100 Employees</MenuItem>
                  <MenuItem  sx={{background: "#080b2a", color: "#AAA5EB", fontFamily: "Poppins"}} value={"101 - 999 Employees"}>101 - 999 Employees</MenuItem>
                  <MenuItem sx={{background: "#080b2a", color: "#AAA5EB", fontFamily: "Poppins"}}  value={"1,000 - 10,000 Employees"}>1,000 - 10,000 Employees</MenuItem>
                  <MenuItem  sx={{background: "#080b2a", color: "#AAA5EB", fontFamily: "Poppins"}} value={"10,000+ Employees"}>10,000+ Employees</MenuItem>
            </StyledTextField>
      
          </div>
          <StyledTextField
            error={errors.description ? true : false}
            size="small"
            label="Please describe yourself / your company. What is your field of focus?*"
            id="description"
            name="description"
            value={values.description}
            helperText={errors.description}
            multiline
            rows={4}
            onChange={(e) => {
              handleChange(e);
            }}
            sx={{ width: "100%" }}
          />
          <span className="checkbox-title mt-3">
          Please describe yourself / your company. What is your field of focus?* 
          </span>
          <div className="checkbox-grid">
            <div className="d-flex align-items-center gap-2">
              <Checkbox
                onChange={() => addProducts("Mini gaming")}
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "#00FECF",
                  },
                }}
              />
              <span className="checkbox-title">Mini gaming</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Checkbox
                onChange={() => addProducts("New charcter creation")}
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "#00FECF",
                  },
                }}
              />
              <span className="checkbox-title">New charcter creation</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Checkbox
                onChange={() => addProducts("Transfer NFT or NFT collection")}
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "#00FECF",
                  },
                }}
              />
              <span className="checkbox-title">Transfer NFT or NFT collection</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Checkbox
                onChange={() => addProducts("New character skin")}
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "#00FECF",
                  },
                }}
              />
              <span className="checkbox-title">New character skin</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Checkbox
                onChange={() => addProducts("In-game resources")}
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "#00FECF",
                  },
                }}
              />
              <span className="checkbox-title">In-game resources</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Checkbox
                onChange={() => addProducts("Other")}
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "#00FECF",
                  },
                }}
              />
              <span className="checkbox-title">Other</span>
            </div>
          </div>
          {errors?.interests && 
          <div className="error-span">{errors.interests}</div>
          }
          <hr className="partner-divider" />
          <div className="d-flex align-items-center gap-2">
            <Checkbox
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "#00FECF",
                },
              }}
            />
            <span className="checkbox-title">
              I agree to share my email address with Dypius. for use in
              accordance with the World of Dypians privacy policy, including to
              receive communications.
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-4">
            {selectedFile ? 
            <div className="d-flex align-items-center gap-2">
                <div className="upload-btn-wrapper">
            <button className="btn upload-btn d-flex align-items-center gap-2">
              <img src={uploadedIcon} alt="" />
              File added
            </button>
          </div>
          <img src={xMark} alt="x mark" onClick={handleChangeBg} style={{cursor: 'pointer'}} />
            </div>
            :
            <div className="upload-btn-wrapper">
              <button className="btn upload-btn d-flex align-items-center gap-2">
                <input type="file" style={{opacity: "0", position: 'absolute', cursor: "pointer", width: '100px'}} className="p-2" onChange={(e) => onFileChange(e)} />
                Upload File
                <img src={uploadIcon} alt="" />
              </button>
            </div>
            }
            <div className="linear-border">
              <button className="btn filled-btn px-5 d-flex align-items-center gap-2" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
          <ReCaptchaV2
                  sitekey="6LflZgEgAAAAAO-psvqdoreRgcDdtkQUmYXoHuy2"
                  style={{ display: "inline-block" }}
                  theme="dark"
                  size="invisible"
                  ref={recaptchaRef}
                />
        </div>
      </div>
    </div>
  );
};

export default PartnerForm;
