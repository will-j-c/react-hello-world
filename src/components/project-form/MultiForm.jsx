import FormProjectPageOne from "./FormProjectPageOne";
import FormProjectPageTwo from "./FormProjectPageTwo";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Confirmation from "./Confirmation";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axiosMain from "axios";

function MultiForm() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state)
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [previewProjectImages, setPreviewProjectImages] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState(null);
  const [message, setMessage] = useState(null);
  const [isEdit, setIsEdit] = useState(location.state?.isEdit);
  const [editProjectSlug, setEditProjectSlug] = useState(location.state?.project?.slug);
  const createNewForm = {
    step: location.search ? parseInt(location.search.slice(-1)) : 1,
    username: auth.username,
    title: "",
    tagline: "",
    categories: checkedCategories,
    logo_url: "",
    state: "",
    description: "",
    image_urls: [],
  };
  const editForm = {
    step: location.search ? parseInt(location.search.slice(-1)) : 1,
    username: auth.username,
    title: location.state?.project?.title,
    tagline: location.state?.project?.tagline,
    categories: location.state?.project?.categories,
    logo_url: location.state?.project?.logo_url,
    state: location.state?.project?.state,
    description: location.state?.project?.description,
    image_urls: location.state?.project?.image_urls,
  }
  const [form, setForm] = useState(isEdit ? editForm : createNewForm);
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
  // Keep track of the checked boxes
  const checkboxTrack = (checkedBoxes) => {
    setCheckedState((prevState) => ({
      ...prevState,
      ...checkedBoxes,
    }));
  };
  // Set the step to 1 if coming in via /projects/create
  useEffect(() => {
    if (!location.search) {
      if (isEdit) {
        navigate(`/projects/${editProjectSlug}/edit?step=${step}`);
      } else {
        navigate(`/projects/create?step=${step}`);
      } 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Proceed to next step
  const nextStep = () => {
    const { step } = form;
    setForm((prevState) => ({ ...prevState, step: step + 1 }));
    if (isEdit) {
      navigate(`/projects/${editProjectSlug}/edit?step=${step + 1}`);
    } else {
      console.log("create forward")
      navigate(`/projects/create?step=${step + 1}`);
    } 
  };
  // Go back to previous step
  const prevStep = () => {
    const { step } = form;
    setForm((prevState) => ({ ...prevState, step: step - 1 }));
    if (isEdit) {
      navigate(`/projects/${location.state.project.slug}/edit?step=${step - 1}`);
    } else {
      navigate(`/projects/create?step=${step - 1}`);
    } 
  };
  // Handle field change
  const handleChange = (input) => (event) => {
    if (input === "categories") {
      if (event.target.checked) {
        setCheckedCategories((prevState) => [...prevState, event.target.value]);
        setForm((prevState) => ({
          ...prevState,
          [input]: checkedCategories,
        }));
      } else {
        setCheckedCategories(
          checkedCategories.filter((value) => {
            return value !== event.target.value;
          })
        );
        setForm((prevState) => ({
          ...prevState,
          [input]: checkedCategories,
        }));
      }
    } else {
      setForm((prevState) => ({
        ...prevState,
        [input]: event.target.value,
      }));
    }
  };
  // Handle file input
  const handleFileInput = (input) => (event) => {
    if (event.target.multiple) {
      const files = event.target.files;
      const arrFiles = [];
      const formData = new FormData();
      for (let i = 0, len = files.length; i < len; i++) {
        arrFiles.push(URL.createObjectURL(files[i]));
        formData.append(
          `image_urls`,
          event.target.files[i],
          event.target.files[i].name
        );
      }
      setForm((prevState) => ({
        ...prevState,
        [input]: formData,
      }));
      setPreviewProjectImages((prevState) => [...prevState, ...arrFiles]);
      return;
    }
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
        "Content-Type": "multipart/form-data boundary=???",
      },
    };
    // Send post request to projects
    axiosPrivate.post("/projects", { ...form, state: "draft" }).then(
      (response) => {
        const photoRequestOne = axiosPrivate.post(
          `/projects/upload?slug=${response.data.slug}`,
          form.logo_url,
          config
        );
        const photoRequestTwo = axiosPrivate.post(
          `/projects/upload?slug=${response.data.slug}`,
          form.image_urls,
          config
        );
        axiosMain.all([photoRequestOne, photoRequestTwo]).then(
          axiosMain.spread((...responses) => {
            setOpen(true);
            setSeverity("success");
            setMessage("Project successfully saved to draft");
            setTimeout(() => {
              navigate(`/projects/${response.data.slug}`);
            }, 2000);
          }),
          axiosMain.spread((...errors) => {
            setOpen(true);
            setSeverity("error");
            setMessage("Ooops, something went wrong...");
          })
        );
      },
      (error) => {
        setOpen(true);
        setSeverity("error");
        setMessage(error.response.data.error);
      }
    );
  };
  // Handle publish
  const publish = (event) => {
    event.preventDefault();
    console.log(form);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data boundary=???",
      },
    };
    axiosPrivate.post("/projects", { ...form, state: "published" }).then(
      (response) => {
        const photoRequestOne = axiosPrivate.post(
          `/projects/upload?slug=${response.data.slug}`,
          form.logo_url,
          config
        );
        const photoRequestTwo = axiosPrivate.post(
          `/projects/upload?slug=${response.data.slug}`,
          form.image_urls,
          config
        );
        axiosMain.all([photoRequestOne, photoRequestTwo]).then(
          axiosMain.spread((...responses) => {
            setOpen(true);
            setSeverity("success");
            setMessage("Project successfully created");
            setTimeout(() => {
              navigate(`/projects/${response.data.slug}`);
            }, 2000);
          }),
          axiosMain.spread((...errors) => {
            setOpen(true);
            setSeverity("error");
            setMessage("Ooops, something went wrong...");
          })
        );
      },
      (error) => {
        setOpen(true);
        setSeverity("error");
        setMessage(error.response.data.error);
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
          checkBoxTrack={checkboxTrack}
          checkedState={checkedState}
        />
      );
    case 2:
      return (
        <FormProjectPageTwo
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          handleFileInput={handleFileInput}
          previewProjectImages={previewProjectImages}
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
          previewLogo={previewLogo}
          previewProjectImages={previewProjectImages}
          open={open}
          severity={severity}
          message={message}
          setOpen={setOpen}
        />
      );
    default:
      break;
  }
}

export default MultiForm;
