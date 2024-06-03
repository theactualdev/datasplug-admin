import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { Form, Modal, ModalBody } from "reactstrap";
import { Button, Col, Icon, RSelect } from "../../../../components/Component";
import { formatDateTimeNumeric } from "../../../../utils/Utils";
import { useGetAllUsers } from "../../../../api/users/user";

const channelOption = [
  { label: "Push", value: "push" },
  { label: "Email", value: "email" },
  { label: "Both", value: "both" },
];

const targetOption = [
  { label: "All", value: "all" },
  { label: "Verified", value: "verified" },
  { label: "Specific", value: "specific" },
];

const AddModal = ({ modal, closeModal, formData, isEdit, createFunction, editFunction }) => {
  const {
    reset,
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const { isLoading, data: users } = useGetAllUsers(1, 100);
  const usersOptions = useMemo(() => {
    if (!isLoading && users) {
      return users.data.map((item) => ({
        id: item.id,
        label: `${item.firstname} ${item.lastname}`,
        value: `${item.firstname} ${item.lastname}`,
      }));
    }
  }, [isLoading, users]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  // console.log(usersOptions);

  const onSubmit = (data) => {
    //Assign apporiate values to the channel prop
    let channels;
    let submittedData;
    if (data.channels.value) {
      if (data.channels.value === "both") {
        channels = ["email", "push"];
      } else {
        channels = [data.channels.value];
      }
    } else {
      channels = data.channels;
    }
    let target_users = selectedUsers.map((item) => item.id);
    let target = data.target.value ? data.target.value : data.target;

    if (target === "specific") {
      submittedData = {
        title: data.title,
        body: data.body,
        target: data.target.value ? data.target.value : data.target,
        channels,
        dispatch_datetime:
          data.dispatchDate instanceof Date ? formatDateTimeNumeric(data.dispatchDate) : data.dispatchDate,
        users: target_users,
      };
    } else {
      submittedData = {
        title: data.title,
        body: data.body,
        target: data.target.value ? data.target.value : data.target,
        channels,
        dispatch_datetime:
          data.dispatchDate instanceof Date ? formatDateTimeNumeric(data.dispatchDate) : data.dispatchDate,
      };
    }
    // console.log(submittedData);
    if (isEdit) {
      editFunction(submittedData);
    } else {
      createFunction(submittedData);
    }
    closeModal();
  };

  const defaultChannel = useMemo(() => {
    if (formData.channels) {
      if (formData.channels.length === 2) {
        return {
          label: "Both",
          value: "Both",
        };
      } else {
        return {
          label: formData.channels[0],
          value: formData.channels[0],
        };
      }
    }
  }, [formData]);

  const targetType = watch("target");

  // console.log(formData.channels);

  // const selectRole = (e) => {
  //   setselectedChannel(e.value);
  //   setFormData({ ...formData, role: e.id });
  // };
  // console.log(rolesOptions);

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

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
          <h5 className="title">{isEdit ? "Edit" : "Add"} Announcement</h5>
          <div className="mt-4">
            <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Col>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={formData.title}
                    {...register("title", { required: "This field is required" })}
                    placeholder="Enter Title"
                  />
                  {errors.title && <span className="invalid">{errors.title.message}</span>}
                </div>
              </Col>
              <Col>
                <div className="form-group">
                  <label className="form-label" htmlFor="cf-default-textarea">
                    Message
                  </label>
                  <div className="form-control-wrap">
                    <textarea
                      className="form-control form-control-sm"
                      id="cf-default-textarea"
                      defaultValue={formData.body}
                      {...register("body", { required: "This is required" })}
                      placeholder="Write your message"
                    />
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Select Channel</label>
                  <div className="form-control-wrap">
                    <Controller
                      control={control}
                      name="channels"
                      render={({ field: { onChange, value } }) => (
                        <RSelect options={channelOption} defaultValue={defaultChannel} onChange={onChange} />
                      )}
                    />
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Select Target Users</label>
                  <div className="form-control-wrap">
                    <Controller
                      control={control}
                      name="target"
                      render={({ field: { onChange, value } }) => (
                        <RSelect options={targetOption} defaultValue={{ label: value, value }} onChange={onChange} />
                      )}
                    />
                  </div>
                </div>
              </Col>
              {targetType?.value === "specific" && (
                <Col>
                  <label className="form-label">Select Users</label>
                  <RSelect
                    isMulti
                    options={usersOptions}
                    defaultValue={selectedUsers}
                    placeholder={"Select Users"}
                    onChange={(e) => setSelectedUsers(e)}
                  />
                </Col>
              )}

              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Select Date</label>
                  <div className="form-control-wrap">
                    <Controller
                      control={control}
                      name="dispatchDate"
                      render={({ field: { onChange, value, ref } }) => (
                        <DatePicker
                          minDate={new Date()}
                          selected={value ? new Date(value) : new Date()}
                          onChange={onChange}
                          className="form-control date-picker"
                        />
                      )}
                    />
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Select Time</label>
                  <div className="form-control-wrap has-timepicker focused">
                    <Controller
                      control={control}
                      name="dispatchDate"
                      render={({ field: { onChange, value, ref } }) => (
                        <DatePicker
                          selected={value ? new Date(value) : new Date()}
                          onChange={onChange}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          className="form-control date-picker"
                        />
                      )}
                    />
                  </div>
                </div>
              </Col>

              <Col size="12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Button color="primary" size="md" type="submit">
                      {isEdit ? "Edit" : "Create"}
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
export default AddModal;
