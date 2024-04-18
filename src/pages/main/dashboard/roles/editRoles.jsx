import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
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

import { useGetAllPermissions, useGetRoleById, useUpdateRole } from "../../../../api/users/admin";
import LoadingSpinner from "../../../components/spinner";

const EditRoles = () => {
  const navigate = useNavigate();
  const { roleId } = useParams();

  const { data: role, isLoading } = useGetRoleById(roleId);
  const { data: permissions } = useGetAllPermissions();
  const { mutate: updateRole } = useUpdateRole();

  // const [permissions, setPermissions] = useState(permissionsData);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    permissions: "",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    name: "",
    permissions: "",
  });

  const handleChange = (e) => {
    const data = selectedPermissions;
    const { id, checked } = e.currentTarget;
    if (checked === true) {
      setSelectedPermissions([...selectedPermissions, id]);
    } else {
      let newData = data.filter((item) => item !== id);
      setSelectedPermissions(newData);
    }
  };

  //   USER NAME
  const onFormSubmit = (data) => {
    let submittedData = {
      roleId: role._id,
      title: data.name,
      permissions: selectedPermissions,
    };
    // API HERE
    // SHOULD NAVIGATE TO ROLE LIST
    // OR JUST REFRESH PAGE
    updateRole(submittedData);
  };

  useEffect(() => {
    if (!isLoading && role) {
      reset({
        name: role.title,
        permissions: role.permissions,
      });
      setSelectedPermissions(role.permissions);
    }
  }, [isLoading, role, reset]);

  return (
    <React.Fragment>
      <Head title="Edit Roles" />
      {role && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle tag="h3" page>
                  Edit Role
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
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <PreviewCard bodyClass="card-inner-stretch">
                <span>Edit role and permissions.</span>
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
                              // value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            {errors.name && <span className="invalid">{errors.name.message}</span>}
                          </div>
                        </div>
                      </Col>
                      <Col md="12" className="">
                        <span className="text-primary fw-bold fs-16px">Permissions</span>
                        <Row className="g-2 align-center mt-1">
                          {permissions.map((item, idx) => (
                            <Col key={idx} size="4">
                              <div key={item} className="custom-control custom-control-sm custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  defaultChecked={role.permissions && role.permissions.includes(item.code)} //returns true if it's in the array
                                  id={item.code}
                                  onChange={(e) => handleChange(e)}
                                />
                                <label className="custom-control-label" htmlFor={item.code}>
                                  <span className="text-secondary fs-14px text-capitalize">{item.name}</span>
                                </label>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </Col>
                      <Col size="12">
                        <Button color="primary" type="submit">
                          <span>Edit role</span>
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </PreviewCard>
            )}
          </Block>
        </Content>
      )}
    </React.Fragment>
  );
};

export default EditRoles;
