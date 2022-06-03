export default function teste() {
    return (<></>);
}

// import { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import DefaultTransition from '../../components/DefaultTransition';
// import { useLayout } from '../../contexts/LayoutContext';
// import * as yup from "yup";
// import { yupResolver } from '@hookform/resolvers/yup';
// import "./styles.scss";
// import { Input } from '../../components/Form/Input';
// import { LoginModel } from '../../models/LoginModel';
// import Button from '../../components/Form/Button';
// import { useAuth } from '../../contexts/AuthContext';
// import Translator from '../../components/I18n/Translator';
// import I18n from '../../components/I18n/I18n';
// import TranslatorStr from '../../components/I18n/TranslatorStr';
// import { Link } from 'react-router-dom';

// export default function SignIn() {
//     const layout = useLayout();

//     const schema = yup.object({
//         email: yup.string().required(TranslatorStr("registersValidations.emailIsRequired")),
//         password: yup.string().required(TranslatorStr("registersValidations.passwordIsRequired")),
//     }).required();

//     const form = useForm<LoginModel>({
//         resolver: yupResolver(schema)
//     });
//     const auth = useAuth();

//     useEffect(() => {
//         layout.setShowMenu(false);
//         layout.setHasContainer(false);
//     }, [layout]);

//     const onSubmit = (data: LoginModel) => {
//         auth.Login(data);
//     };

//     return (
//         <DefaultTransition className="h-100 bg-light login-page">
//             <div className="position-relative h-100">
//                 <div className="row h-100">
//                     <div className="col-md-4 d-none d-lg-block">
//                         <div className="img-login w-100 h-100"></div>
//                     </div>

//                     <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
//                         <div className="px-4 h-100 d-flex flex-column justify-content-between">
//                             <div></div>

//                             <div>
//                                 <img id="logo-gp" alt="" className="mb-4" />
//                                 <div className="d-flex align-items-center gap-3 mb-3">
//                                     <div className="d-flex flex-column">
//                                         <span className="title fs-xl m-0 mb-3 text-brown">
//                                             <Translator path="signIn.title" />
//                                         </span>
//                                         <p className="description fs-normal fw-light m-0 mb-4">
//                                             <Translator path="signIn.slogan" />
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <form onSubmit={form.handleSubmit(onSubmit)}>
//                                     <Input type="email" name="email" form={form} label={<Translator path="general.user" />} defaultValue="geplant@geplant.com.br" />
//                                     <Input type="password" name="password" form={form} label={<Translator path="general.password" />} defaultValue="Gepl@nt1599" />
//                                     <Button
//                                         type="submit"
//                                         className="mt-4 mb-2 w-100 fw-medium rounded-10"
//                                         title={<Translator path="signIn.logIn" />}
//                                         colorType="normal"
//                                     />

//                                     <div className="d-flex justify-content-end fs-xs">
//                                         <Link to="/forgot-password" className='text-decoration-none text-dark-green'>
//                                             <Translator path="signIn.forgotPassword" />
//                                         </Link>
//                                     </div>

//                                     <div className="d-flex justify-content-center mt-4">
//                                         <I18n />
//                                     </div>
//                                 </form>
//                             </div>

//                             <div className="d-flex flex-column mb-3">
//                                 <img id="logo-geplant" alt="" />
//                                 <span className="text-dark-green text-center my-2 fw-light">© 2022 Geplant Tecnologia Florestal Ltda.</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col-md-4 d-none d-lg-block"></div>
//                 </div>
//             </div>
//         </DefaultTransition>
//     );
// }

