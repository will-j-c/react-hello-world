import FormProjectPageOne from "./FormProjectPageOne";
import FormProjectPageTwo from "./FormProjectPageTwo";
import { useState, useContext, useEffect, useCallback } from "react";
import AuthContext from "../../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Confirmation from "./Confirmation";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function MultiForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [form, setForm] = useState({
    step: location.search ? parseInt(location.search.slice(-1)) : 1,
    username: auth.username,
    title: "",
    tagline: "",
    categories: [],
    logo_url: "",
    state: "",
    description: "",
    image_urls: [],
  });
  const {
    step,
    username,
    title,
    tagline,
    categories,
    logo_url,
    state,
    description,
    image_urls,
  } = form;
  const values = {
    step,
    username,
    title,
    tagline,
    categories,
    logo_url,
    state,
    description,
    image_urls,
  };
  // Set the step to 1 if coming in via /projects/create
  useEffect(() => {
    if (!location.search) {
      navigate(`/projects/create?step=${step}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Proceed to next step
  const nextStep = () => {
    const { step } = form;
    setForm((prevState) => ({ ...prevState, step: step + 1 }));
    navigate(`/projects/create?step=${step + 1}`);
  };
  // Go back to previous step
  const prevStep = () => {
    const { step } = form;
    setForm((prevState) => ({ ...prevState, step: step - 1 }));
    navigate(`/projects/create?step=${step - 1}`);
  };
  // Handle field change
  const handleChange = (input) => (event) => {
    setForm((prevState) => ({
      ...prevState,
      [input]: event.target.value,
    }));
  };
  // Handle file input
  const handleFileInput = (input) => (event) => {
    setPreviewLogo(URL.createObjectURL(event.target.files[0]));
    const formData = new FormData();
    formData.append(
      "logo_url",
      event.target.files[0],
      event.target.files[0].name
    );
    setForm((prevState) => ({
      ...prevState,
      [input]: formData,
    }));
  };
  // Handle save as draft
  const saveDraft = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    // Send post request to projects
    axiosPrivate.post("/projects", {...form, state: "draft"}, config).then(
      (response) => {
        console.log("Response: ", response);
        // Reroute to project you just created in draft
        navigate(`/projects/${response.data.slug}`);
      },
      (error) => {
        // TODO error handling
        // If error snack bar with details
        console.log("Error: ", error);
      }
    );
  };
  // Handle publish
  const publish = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axiosPrivate.post("/projects", {...form, state: "published"}, config).then(
      (response) => {
        console.log("Response: ", response);
        // Reroute to project you just published
        navigate(`/projects/${response.data.slug}`);
      },
      (error) => {
        // TODO error handling
        // If error snack bar with details
        console.log("Error: ", error);
      }
    );
 
  };
  switch (step) {
    case 1:
      return (
        <FormProjectPageOne
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          handleFileInput={handleFileInput}
          values={values}
          previewLogo={previewLogo}
        />
      );
    case 2:
      return (
        <FormProjectPageTwo
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          handleFileInput={handleFileInput}
          values={values}
        />
      );
    case 3:
      return (
        <Confirmation
          saveDraft={saveDraft}
          publish={publish}
          prevStep={prevStep}
          values={values}
        />
      );
    default:
      break;
  }
}

export default MultiForm;
