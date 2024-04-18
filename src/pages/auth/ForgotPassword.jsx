import React, { useState } from "react";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, PreviewCard } from "../../components/Component";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "../../api/authentication";
import NiteonLogo from "../../images/niteon-real.png";

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();

  const emailValue = searchParams.get("email") || "";
  const [email, setEmail] = useState(emailValue);
  const { mutate: sendEmail } = useForgotPassword(email);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  const formSubmit = (formData) => {
    setEmail(formData.email);
    sendEmail(formData);
    // console.log(formData);
  };

  return (
    <>
      <Head title="Forgot-Password" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link to={import.meta.env.PUBLIC_URL + "/"} className="logo-link">
            <img className="logo-light logo-img logo-img-lg" src={NiteonLogo} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={NiteonLogo} alt="logo-dark" />
          </Link>
        </div>
        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h5">Reset password</BlockTitle>
              <BlockDes>
                <p>Please enter your email, and we’ll email you instructions to reset your password.</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email
                </label>
              </div>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                defaultValue={emailValue}
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="invalid">{errors.email.message}</span>}
            </div>
            <div className="form-group">
              <Button color="primary" size="lg" className="btn-block">
                Send Reset Link
              </Button>
            </div>
          </form>
          <div className="form-note-s2 text-center pt-4">
            <Link to={`${import.meta.env.PUBLIC_URL}/auth-login`}>
              <strong>Return to login</strong>
            </Link>
          </div>
        </PreviewCard>
      </Block>
      <AuthFooter />
    </>
  );
};
export default ForgotPassword;
