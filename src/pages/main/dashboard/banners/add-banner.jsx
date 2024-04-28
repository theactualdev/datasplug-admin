import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Form, Modal, ModalBody, Input } from "reactstrap";
import { Button, Col, Icon } from "../../../../components/Component";
import { useCreateBanners } from "../../../../api/banners";

const AddBanner = ({ modal, closeModal }) => {
  const { mutate: create } = useCreateBanners();

  const [previewImage, setPreviewImage] = useState([]);
  const [featuredImage, setFeaturedImage] = useState([]);

  //   console.log(featuredImage);

  const submitForm = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("preview_image", previewImage[0]);
    data.append("featured_image", featuredImage[0]);

    create(data);
    closeModal();
    setFeaturedImage([]);
    setPreviewImage([]);
  };

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles, set) => {
    acceptedFiles.forEach((file) => {
      set([file]);
      // console.log(file);
    });
  };
  return (
    <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="lg">
      <ModalBody>
        <a
          href="#cancel"
          onClick={(ev) => {
            ev.preventDefault();
            closeModal();
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
                  accept={[".jpg", ".png", ".svg"]}
                  maxFiles={1}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                        <input {...getInputProps()} />
                        {previewImage.length === 0 && (
                          <div className="dz-message">
                            <span className="dz-message-text">Drag and drop file</span>
                            <span className="dz-message-or">or</span>
                            <Button type="button" color="primary">
                              SELECT
                            </Button>
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
              </Col>
              <Col>
                <label className="form-label">Featured Image</label>
                <Dropzone
                  onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFeaturedImage)}
                  accept={[".jpg", ".png", ".svg"]}
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
                        closeModal();
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
