import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { Form, Modal, ModalBody } from "reactstrap";
import { Button, Col, Icon } from "../../../../components/Component";

const EditProviderLogo = ({ modal, closeModal, formData, isEdit, editFunction, data }) => {
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [rejectedFiles, setRejectedFile] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

  //   console.log(formData);
  const onSubmit = (data) => {
    let dataToSend = new FormData();
    dataToSend.append("logo", previewImage[0]);

    editFunction(dataToSend);
    close();
  };

  const close = () => {
    setRejectedFile([]);
    setPreviewImage([]);
    closeModal();
  };

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles, set) => {
    acceptedFiles.forEach((file) => {
      set([file]);
      // console.log(file);
    });
    if (rejectedFiles) {
      setRejectedFile([]);
    }
  };

  const handleOnReject = (rejectedFile, set) => {
    set(rejectedFile);
  };

  // console.log(formData);

  return (
    <Modal isOpen={modal} toggle={close} className="modal-dialog-centered" size="lg">
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
          <h5 className="title">Edit Provider Logo</h5>
          <div className="mt-4">
            <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
              {/* <Col md="12" className="">
                <span className="text-primary fw-bold fs-16px">Product Types</span>
                <Row className="g-2 align-center mt-1">
                  {productTypes?.data?.map((item, idx) => (
                    <Col key={idx} size="4">
                      <div key={item} className="custom-control custom-control-sm custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          defaultChecked={formData?.product_type && formData.product_type.includes(item)} //returns true if it's in the array
                          id={item}
                          onChange={(e) => handleChange(e)}
                        />
                        <label className="custom-control-label" htmlFor={item}>
                          <span className="text-secondary fs-14px text-capitalize">{item}</span>
                        </label>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col> */}

              <Col>
                <label className="form-label">Add Logo</label>
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

              <Col size="12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Button color="primary" size="md" type="submit">
                      Proceed
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
export default EditProviderLogo;
