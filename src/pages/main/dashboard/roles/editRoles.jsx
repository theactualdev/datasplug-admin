import React, { useEffect, useMemo, useState } from "react";
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
  const { mutate: updateRole } = useUpdateRole(roleId);

  // console.log(permissions);

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
      setSelectedPermissions([...selectedPermissions, Number(id)]);
    } else {
      let newData = data?.filter((item) => item !== Number(id));
      setSelectedPermissions(newData);
    }
  };

  //   USER NAME
  const onFormSubmit = (data) => {
    let submittedData = {
      name: data?.name,
      permissions: selectedPermissions,
    };
    // API HERE
    // SHOULD NAVIGATE TO ROLE LIST
    // OR JUST REFRESH PAGE
    updateRole(submittedData);
  };

  const perms = useMemo(() => {
    return role?.data?.permissions.map((item) => item.id);
  }, [role]);

  // console.log(role?.data?.permissions);

  useEffect(() => {
    if (!isLoading && role) {
      let perm = role?.data?.permissions.map((item) => item.id);
      reset({
        name: role?.data?.name,
        permissions: role?.data?.permissions,
      });
      setSelectedPermissions(perm);
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
                        <Row className="g-4 align-center mt-1">
                          {permissions?.data?.map((item, idx) => (
                            <Col key={idx}>
                              <h6 className="mb-2">{item.group}</h6>
                              <Row className="g-1">
                                {item?.permissions?.map((permission) => (
                                  <Col size="3">
                                    <div
                                      key={permission.id}
                                      className="custom-control custom-control-sm custom-checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={permission.id}
                                        onChange={(e) => handleChange(e)}
                                        defaultChecked={perms && perms.includes(permission.id)} //returns true if it's in the array
                                      />
                                      <label className="custom-control-label" htmlFor={permission.id}>
                                        <span className="text-secondary fs-14px text-capitalize">
                                          {permission.name}
                                        </span>
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
