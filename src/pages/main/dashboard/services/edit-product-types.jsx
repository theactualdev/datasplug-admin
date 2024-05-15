import React, { useState, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Form, Modal, ModalBody } from "reactstrap";
import { Row, Button, Col, Icon, RSelect } from "../../../../components/Component";
import { formatDateTimeNumeric } from "../../../../utils/Utils";
import { useGetProductTypes } from "../../../../api/generics";

const EditServiceProductTypes = ({ modal, closeModal, formData, isEdit, editFunction, data }) => {
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { isLoading, data: productTypes } = useGetProductTypes();
  //   console.log(productTypes);

  const handleChange = (e) => {
    const data = selectedOptions;
    const { id, checked } = e.currentTarget;
    if (checked === true) {
      setSelectedOptions([...selectedOptions, id]);
    } else {
      let newData = data.filter((item) => item !== id);
      setSelectedOptions(newData);
    }
  };

  //   console.log(formData);
  const onSubmit = (data) => {
    let submittedData = {
      product_type: selectedOptions,
    };
    editFunction(submittedData);
    closeModal();
  };

  useEffect(() => {
    if (formData?.product_type) {
      setSelectedOptions(formData?.product_type);
    }
  }, [formData]);

  // console.log(formData);

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
          <h5 className="title">Edit Product Types</h5>
          <div className="mt-4">
            <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Col md="12" className="">
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
              </Col>

              <Col size="12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Button color="primary" size="md" type="submit">
                      Edit Product Types
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
export default EditServiceProductTypes;
