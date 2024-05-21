import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  Icon,
  PreviewCard,
  Row,
} from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";

import { useCreateRole, useGetAllPermissions } from "../../../../api/users/admin";

const CreateRoles = () => {
  const navigate = useNavigate();
  const { data: permissions } = useGetAllPermissions();
  const { mutate } = useCreateRole();
  console.log(permissions);

  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    permissions: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    name: "",
    permissions: [],
  });

  const handleChange = (e) => {
    const data = selectedPermissions;
    const { id, checked } = e.currentTarget;
    if (checked === true) {
      setSelectedPermissions([...selectedPermissions, Number(id)]);
    } else {
      let newData = data.filter((item) => item !== id);
      setSelectedPermissions(newData);
    }
  };
  //   USER NAME
  const onFormSubmit = async (data) => {
    let submittedData = {
      name: data.name,
      permissions: selectedPermissions,
    };
    mutate(submittedData);
  };

  return (
    <React.Fragment>
      <Head title="Create Roles" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Create Role
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <Button color="light" outline className="bg-white d-none d-sm-inline-flex" onClick={() => navigate(-1)}>
                <Icon name="arrow-left"></Icon>
                <span>Back</span>
              </Button>
              <a
                href="#back"
                onClick={(ev) => {
                  ev.preventDefault();
                  navigate(-1);
                }}
                className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"
              >
                <Icon name="arrow-left"></Icon>
              </a>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <PreviewCard bodyClass="card-inner-stretch">
            <span>Create a new role and assign permissions.</span>
            <div className="mt-4">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <Row className="g-4">
                  <Col lg="6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="product-title">
                        Role Name
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          className="form-control"
                          {...register("name", {
                            required: "This field is required",
                          })}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <span className="invalid">{errors.name.message}</span>}
                      </div>
                    </div>
                  </Col>
                  <Col md="12" className="">
                    <span className="text-primary fw-bold fs-16px">Permissions</span>
                    <Row className="g-4 align-center mt-1">
                      {permissions?.data?.map((item, idx) => (
                        <Col key={idx}>
                          <h6 className="mb-2">{item.group}</h6>
                          <Row className="g-1">
                            {item?.permissions?.map((permission) => (
                              <Col size="3">
                                <div key={permission.id} className="custom-control custom-control-sm custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={permission.id}
                                    onChange={(e) => handleChange(e)}
                                  />
                                  <label className="custom-control-label" htmlFor={permission.id}>
                                    <span className="text-secondary fs-14px text-capitalize">{permission.name}</span>
                                  </label>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col size="12">
                    <Button color="primary" type="submit">
                      <span>Create role</span>
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default CreateRoles;
