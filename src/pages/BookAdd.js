import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { API } from "../configs/api";

export default function ProductAdd() {
  const form = useRef();
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [document, setDocument] = useState();
  const [message, setMessage] = useState();
  const [isEbook, setIsEbook] = useState(false);
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleSubmit = useMutation(async (e) => {
    setMessage(null);
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("isEbook", +isEbook);
      if (image) formData.set("image", image, image.name);
      if (document) formData.set("document", document, document.name);
      formData.set("title", form.current.title.value);
      formData.set("author", form.current.author.value);
      formData.set("publicationDate", form.current.publicationDate.value);
      formData.set("desc", form.current.desc.value);
      formData.set("price", form.current.price.value);
      formData.set("qty", form.current.qty.value);
      formData.set("isbn", form.current.isbn.value);

      const response = await API.post(`/book`, formData, config);

      console.log(response);
      navigate("/");
    } catch (error) {
      const msg = !image
        ? error.response.data.message
        : error.response.data.error.message;
      const alert = (
        <Alert variant="danger" className="py-1 text-start">
          {msg}
        </Alert>
      );
      setMessage(alert);
    }
  });

  return (
    <div>
      <NavBar page="book" />
      <div className="mx-5 pt-1 mb-2">
        <div className="fw-bold fs-4 mb-2">Add Book</div>
        {message}
        <form ref={form} onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-4 mb-5 edit">
            <Form.Control
              type="text"
              name="title"
              className="mb-4"
              placeholder="Title"
            />
            <Form.Control
              type="text"
              name="author"
              className="mb-4"
              placeholder="Author"
            />
            <Form.Control
              type="text"
              name="publicationDate"
              className="mb-4"
              placeholder="Publication Date"
            />
            <Form.Control
              type="text"
              name="pages"
              className="mb-4"
              placeholder="Pages"
            />
            <Form.Control
              type="text"
              name="isbn"
              className="mb-4"
              placeholder="ISBN"
            />
            <Form.Control
              as="textarea"
              rows={7}
              type="text"
              name="desc"
              className="mb-4"
              placeholder="About This Book"
            />
            <Form.Control
              type="number"
              name="price"
              className="mb-4"
              placeholder="Price"
            />
            <Form.Control
              type="text"
              name="qty"
              placeholder="Qty"
              className="mb-4"
            />
            {image && (
              <img src={preview} alt="preview" style={{ width: "10vw" }} />
            )}
            <Form.Control
              accept="image/png, image/jpeg, image/jpg"
              type="file"
              name="image"
              className="mt-2"
              single
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={false}
                    checked={isEbook}
                    onChange={() => setIsEbook(!isEbook)}
                  />
                }
                label="eBook"
              />
            </FormGroup>
            {isEbook ? (
              <Form.Control
                type="file"
                name="document"
                className="mt-2"
                single
                onChange={(e) => {
                  setDocument(e.target.files[0]);
                }}
              />
            ) : (
              <></>
            )}
          </div>
          <Button
            style={{ width: "100%" }}
            type="submit"
            className="btn-dark text-capitalize mb-4"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
