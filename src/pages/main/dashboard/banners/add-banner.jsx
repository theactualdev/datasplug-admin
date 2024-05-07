import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Form, Modal, ModalBody, Input } from "reactstrap";
import { Button, Col, Icon } from "../../../../components/Component";
import { useCreateBanners } from "../../../../api/banners";

const AddBanner = ({ modal, closeModal }) => {
  const { mutate: create } = useCreateBanners();

  const [previewImage, setPreviewImage] = useState([]);
  const [featuredImage, setFeaturedImage] = useState([]);
  const [rejectedFiles, setRejectedFile] = useState([]);
  const [rejectedFeature, setRejectedFeature] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("preview_image", previewImage[0]);
    data.append("featured_image", featuredImage[0]);

    create(data);
    closeModal();
    setFeaturedImage([]);
    setPreviewImage([]);
    setRejectedFile([]);
    setRejectedFeature([]);
  };

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles, set) => {
    acceptedFiles.forEach((file) => {
      set([file]);
      // console.log(file);
    });
    if (rejectedFiles || rejectedFeature) {
      setRejectedFeature([]);
      setRejectedFile([]);
    }
  };

  const handleOnReject = (rejectedFile, set) => {
    set(rejectedFile);
  };

  const close = () => {
    closeModal();
    setFeaturedImage([]);
    setPreviewImage([]);
    setRejectedFile([]);
    setRejectedFeature([]);
  };
  return (
    <Modal isOpen={modal} toggle={close} className="modal-dialog-centered" size="lg">
      <ModalBody>
        <a
          href="#cancel"
          onClick={(ev) => {
            ev.preventDefault();
            close();
          }}
          className="close"
        >
          <Icon name="cross-sm"></Icon>
        </a>
        <div className="p-2">
          <h5 className="title">Add Banner</h5>
          <div className="mt-4">
            <Form className="row gy-4" noValidate onSubmit={submitForm}>
              <Col>
                <label className="form-label">Preview Image</label>
                <Dropzone
                  onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setPreviewImage)}
                  accept={[".jpg", ".png", ".jpeg"]}
                  maxFiles={1}
                  onDropRejected={(file) => handleOnReject(file, setRejectedFile)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                        <input {...getInputProps()} />
                        {previewImage.length === 0 && (
                          <div className="dz-message">
                            <span className="dz-message-text">Drag 'n' drop some files here</span>
                            <span className="dz-message-or">or</span>
                            <Button type="button" color="primary">
                              SELECT
                            </Button>
                            <p>(Only *.jpg, *.png and *.jpeg will be accepted) </p>
                          </div>
                        )}
                        {previewImage.map((file) => (
                          <div
                            key={file.name}
                            className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                          >
                            <div className="dz-image">
                              <img src={`${URL.createObjectURL(file)}`} alt="preview" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </Dropzone>
                {rejectedFiles.map(({ file, errors }) => (
                  <div key={file.path}>
                    {errors.map((error) => (
                      <p key={error.code} className="text-danger">
                        {error.message}
                      </p>
                    ))}
                  </div>
                ))}
              </Col>
              <Col>
                <label className="form-label">Featured Image</label>
                <Dropzone
                  onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFeaturedImage)}
                  accept={[".jpg", ".png", ".jpeg"]}
                  maxFiles={1}
                  onDropRejected={(file) => handleOnReject(file, setRejectedFeature)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                        <input {...getInputProps()} />
                        {featuredImage.length === 0 && (
                          <div className="dz-message">
                            <span className="dz-message-text">Drag and drop file</span>
                            <span className="dz-message-or">or</span>
                            <Button type="button" color="primary">
                              SELECT
                            </Button>
                            <p>(Only *.jpg, *.png and *.jpeg will be accepted) </p>
                          </div>
                        )}
                        {featuredImage.map((file) => (
                          <div
                            key={file.name}
                            className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                          >
                            <div className="dz-image">
                              <img src={`${URL.createObjectURL(file)}`} alt="preview" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </Dropzone>
                {rejectedFeature.map(({ file, errors }) => (
                  <div key={file.path}>
                    {errors.map((error) => (
                      <p key={error.code} className="text-danger">
                        {error.message}
                      </p>
                    ))}
                  </div>
                ))}
              </Col>

              <Col size="12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Button color="primary" size="md" type="submit">
                      Create Banner
                    </Button>
                  </li>
                  <li>
                    <a
                      href="#cancel"
                      onClick={(ev) => {
                        ev.preventDefault();
                        close();
                      }}
                      className="link link-light"
                    >
                      Cancel
                    </a>
                  </li>
                </ul>
              </Col>
            </Form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddBanner;
