import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, UncontrolledDropdown } from "reactstrap";
import { useCreateFaq, useDeleteFaq, useGetFaqCategories, useGetFaqs, useUpdateFaq } from "../../../../api/faqs";
import {
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  Icon,
  RSelect,
  Row,
} from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import FaqTable from "./faqTable";
import { formatDateWithTime } from "../../../../utils/Utils";

const FAQsPage = () => {
  const [editId, setEditedId] = useState();
  const { isLoading, data: faqs } = useGetFaqs();
  const { mutate: createFaq } = useCreateFaq();
  const { mutate: updateFaq } = useUpdateFaq(editId);
  const { mutate: deleteFaq } = useDeleteFaq(editId);

  // console.log(faqs);

  const { data: categories } = useGetFaqCategories();

  const faqCategories = useMemo(() => {
    if (categories) {
      return categories.data.map((item) => {
        return {
          label: item?.name,
          value: item?.name,
          id: item?.id,
        };
      });
    }
  }, [categories]);

  const [formData, setFormData] = useState({
    id: null,
    question: "",
    answer: "",
    category: "",
    createdAt: "",
  });
  const [view, setView] = useState({
    add: false,
    details: false,
    edit: false,
  });

  // toggle function to view order details

  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
      edit: type === "edit" ? true : false,
    });
  };

  // resets forms
  const resetForm = () => {
    setFormData({
      id: null,
      question: "",
      answer: "",
      category: null,
      createdAt: "",
    });
  };

  // Submits form data
  const onFormSubmit = (form) => {
    // console.log(form);
    let submittedData = {
      question: form.question,
      answer: form.answer,
      faq_category_id: form.categoryId,
    };
    if (view.add) {
      createFaq(submittedData);
    } else {
      updateFaq(submittedData);
    }

    setView({ add: false, details: false, edit: false });
    resetForm();
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    faqs?.data?.forEach((item) => {
      if (item.id === id) {
        setFormData({
          category: item.faq_category.name,
          question: item.question,
          answer: item.answer,
          createdAt: item.created_at,
          categoryId: item.faq_category.id,
        });
      }
    });
    setEditedId(id);
  };

  useEffect(() => {
    reset(formData);
  }, [formData]);

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false, edit: false });
    resetForm();
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ActionOptions = ({ id }) => (
    <ul className="nk-tb-actions gx-1 my-n1">
      <li>
        <UncontrolledDropdown>
          <DropdownToggle tag="a" className="btn btn-trigger dropdown-toggle btn-icon me-n1">
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu end>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  href="#"
                  onClick={(ev) => {
                    ev.preventDefault();
                    onEditClick(id);
                    setView({ add: false, edit: false, details: true });
                  }}
                >
                  <Icon name="eye"></Icon>
                  <span>View</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#"
                  onClick={(ev) => {
                    ev.preventDefault();
                    onEditClick(id);
                    setView({ add: false, edit: true, details: false });
                  }}
                >
                  <Icon name="edit"></Icon>
                  <span>Edit</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  href="#"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setEditedId(id);
                    deleteFaq();
                  }}
                >
                  <Icon name="trash"></Icon>
                  <span>Delete</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
  );

  // const ActionOptionsnew = ({ id }) => (
  //   <div className="tb-odr-action">
  //     <div className="tb-odr-btns d-none d-md-flex">
  //       <Button
  //         color="primary"
  //         className="btn-sm"
  //         onClick={(ev) => {
  //           onEditClick(id);
  //           setView({ add: false, edit: false, details: true });
  //         }}
  //       >
  //         View
  //       </Button>

  //       <UncontrolledDropdown>
  //         <DropdownToggle
  //           tag="a"
  //           href="#more"
  //           onClick={(ev) => ev.preventDefault()}
  //           className="text-soft dropdown-toggle btn btn-icon btn-trigger ms-1"
  //         >
  //           <Icon name="more-h"></Icon>
  //         </DropdownToggle>
  //         <DropdownMenu end>
  //           <ul className="link-list-plain">
  //             <li>
  //               <DropdownItem
  //                 tag="a"
  //                 href="#"
  //                 onClick={(ev) => {
  //                   ev.preventDefault();
  //                   onEditClick(id);
  //                   setView({ add: false, edit: true, details: false });
  //                 }}
  //               >
  //                 <Icon name="edit"></Icon>
  //                 <span>Edit</span>
  //               </DropdownItem>
  //             </li>{" "}
  //             <li>
  //               <DropdownItem
  //                 tag="a"
  //                 href="#"
  //                 onClick={(ev) => {
  //                   ev.preventDefault();
  //                   setEditedId(id);
  //                   deleteFaq();
  //                 }}
  //               >
  //                 <Icon name="trash"></Icon>
  //                 <span>Delete</span>
  //               </DropdownItem>
  //             </li>
  //           </ul>
  //         </DropdownMenu>
  //       </UncontrolledDropdown>
  //     </div>
  //   </div>
  // );

  return (
    <React.Fragment>
      <Head title="FAQs"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>FAQs</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className="toggle btn-icon d-md-none"
                  color="primary"
                  onClick={() => {
                    toggle("add");
                  }}
                >
                  <Icon name="plus"></Icon>
                </Button>
                <Button
                  className="toggle d-none d-md-inline-flex"
                  color="primary"
                  onClick={() => {
                    toggle("add");
                  }}
                >
                  <Icon name="plus"></Icon>
                  <span>Create FAQ</span>
                </Button>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <FaqTable
            faqTitle="faqs"
            defaultData={faqs?.data}
            data={faqs?.data}
            headers={["Question", "Category", "Answer", "Date"]}
            dataKeys={["question", "faq_category", "answer", "created_at"]}
            modelOpen={setView}
            action={ActionOptions}
            isLoading={isLoading}
          />
        </Block>

        {/* ADD CATEGORIES */}
        <Modal isOpen={view.add || view.edit} toggle={() => onFormCancel()} className="modal-dialog-centered" size="md">
          <ModalBody className="bg-white rounded">
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">{view.add ? "Add" : "Edit"} FAQ</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label">Select FAQs category</label>
                        <div className="form-control-wrap">
                          <RSelect
                            options={faqCategories}
                            value={{ label: formData.category, value: formData.category }}
                            onChange={(e) => setFormData({ ...formData, category: e.value, categoryId: e.id })}
                            placeholder="Select"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Enter Question
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            {...register("question", {
                              required: "This field is required",
                            })}
                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                            value={formData.name}
                          />
                          {errors.question && <span className="invalid">{errors.question.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col sm="12">
                      <div className="form-group">
                        <label htmlFor="default-textarea" className="form-label">
                          Answer
                        </label>
                        <div className="form-control-wrap">
                          <textarea
                            className="no-resize form-control"
                            type="textarea"
                            id="content"
                            {...register("answer", {
                              required: "This field is required",
                            })}
                            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                            placeholder="Type answer..."
                          />
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>{view.add ? "Add" : "Edit"} FAQ</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* View */}
        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">View FAQ</h5>
              <div className="mt-4">
                <Row className="gy-3">
                  <Col>
                    <span className="sub-text">Question</span>
                    <span className="caption-text text-primary">{formData.question}</span>
                  </Col>
                  <Col>
                    <span className="sub-text">FAQ category</span>
                    <span className="caption-text">{formData.category}</span>
                  </Col>
                  <Col>
                    <span className="sub-text">Answer</span>
                    <span className="caption-text">{formData.answer}</span>
                  </Col>

                  <Col lg={6}>
                    <span className="sub-text">Date Created</span>
                    <span className="caption-text">{formatDateWithTime(formData.createdAt)}</span>
                  </Col>
                </Row>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default FAQsPage;
