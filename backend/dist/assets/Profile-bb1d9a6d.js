import{r as i,u as b,j as e}from"./index-4bf03aac.js";import{u as w}from"./useUser-8b6af973.js";import{C as y}from"./ColorButtons-9f315cd3.js";const p={name:"",email:"",password:"",confirmPassword:""},v=()=>{const{updateUser:c,state:{userInfo:a}}=w(),[{name:l,email:t,password:o,confirmPassword:m},n]=i.useState(a||p),d=b();i.useEffect(()=>{a!==null&&d("/profile")},[d,a]);const s=r=>{r.preventDefault();const{id:x,value:f}=r.target;n(h=>({...h,[x]:f}))},u=r=>{r.preventDefault(),c({name:l,email:t,password:o,confirmPassword:m}),n({...p,...a})};return e.jsxs("div",{className:"max-w-2xl rounded-md border-[1px] border-gray-400 p-12",children:[e.jsx("h2",{className:"mb-6 flex flex-col items-start justify-start text-4xl font-bold",children:"Update Profile"}),e.jsxs("form",{onSubmit:u,children:[e.jsx("label",{className:"text-gray-900",htmlFor:"name",children:"Name"}),e.jsx("input",{className:"my-1 mb-4 w-full rounded-md border-[1px] px-2 py-1",id:"name",name:"name",type:"text",placeholder:"Enter name",value:l,onChange:s}),e.jsx("label",{className:"text-gray-900",htmlFor:"email",children:"Email Address"}),e.jsx("input",{className:"my-1 mb-4 w-full rounded-md border-[1px] px-2 py-1",id:"email",name:"email",type:"email",placeholder:"Enter email",value:t,onChange:s}),e.jsx("label",{className:"text-gray-900",htmlFor:"password",children:"Password"}),e.jsx("input",{className:"my-1 mb-4 w-full rounded-md border-[1px] px-2 py-1",id:"password",name:"password",type:"password",placeholder:"Enter password",value:o,onChange:s}),e.jsx("label",{className:"text-gray-900",htmlFor:"email",children:"Confirm Password"}),e.jsx("input",{className:"my-1 mb-4 w-full rounded-md border-[1px] px-2 py-1",id:"confirmPassword",name:"confirmPassword",type:"password",placeholder:"Confirm password",value:m,onChange:s}),e.jsx(y,{bgColor:"bg-blue-600",children:"Update"})]})]})};export{v as default};