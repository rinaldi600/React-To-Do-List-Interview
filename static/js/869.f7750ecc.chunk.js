"use strict";(self.webpackChunkto_do_list_app=self.webpackChunkto_do_list_app||[]).push([[869],{869:function(e,t,a){a.r(t);var i=a(439),d=a(791),o=a(912),l=a(184);t.default=function(e){var t=e.closeModalAddTODO,a=e.idActivity,s=(0,d.useState)(""),r=(0,i.Z)(s,2),n=r[0],c=r[1],h=(0,d.useState)(""),m=(0,i.Z)(h,2),x=m[0],u=m[1],p=(0,d.useState)(""),b=(0,i.Z)(p,2),g=b[0],y=b[1];return(0,l.jsx)("div",{"data-cy":"modal-add",className:"flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-[#7A7A7A]/50",children:(0,l.jsxs)("div",{className:"w-[803px] min-h-max mb-3 rounded-[12px] bg-white",children:[(0,l.jsxs)("div",{className:"flex border-b border-[#E5E5E5] justify-between items-center p-4",children:[(0,l.jsx)("h1",{"data-cy":"modal-add-title",className:"font-semibold text-lg",children:"Tambah List Item"}),(0,l.jsx)("div",{children:(0,l.jsx)("svg",{onClick:function(){return t(!1)},"data-cy":"modal-add-close-button",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6 cursor-pointer",children:(0,l.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18L18 6M6 6l12 12"})})})]}),(0,l.jsxs)("div",{className:"p-4 border-b border-[#E5E5E5]",children:[(0,l.jsxs)("div",{className:"max-w-[759px] h-[52px] mb-4",children:[(0,l.jsx)("h3",{"data-cy":"modal-add-name-title",className:"text-xs mb-2 font-semibold text-left",children:"Nama List Item"}),(0,l.jsx)("input",{onChange:function(e){return function(e){u(e.target.value)}(e)},"data-cy":"modal-add-name-input",type:"text",className:"w-full h-full p-2 rounded-[6px] border border-[#E5E5E5] bg-white",placeholder:"Tambahkan nama list item"})]}),(0,l.jsxs)("div",{className:"max-w-[759px] h-[52px] mt-14 mb-8",children:[(0,l.jsx)("h3",{"data-cy":"modal-add-priority-title",className:"text-xs mb-2 font-semibold text-left",children:"Priority"}),(0,l.jsx)("div",{className:"text-left",children:(0,l.jsxs)("select",{onChange:function(e){return function(e){"very-high"===e.target.value?c("#ED4C5C"):"high"===e.target.value?c("#F8A541"):"medium"===e.target.value?c("#00A790"):"low"===e.target.value?c("#428BC1"):c("#8942C1"),y(e.target.value)}(e)},"data-cy":"modal-add-priority-dropdown",className:"".concat(""!==n?"bg-[".concat(n,"]"):"bg-[#ED4C5C]"," w-[252px] min-h-[52px] border text-white border-[#E5E5E5] rounded-[6px]"),id:"priority",name:"priority",children:[(0,l.jsx)("option",{className:"bg-[#ED4C5C] p-10 text-white","data-cy":"modal-add-priority-very-high",value:"very-high",children:"Very High"}),(0,l.jsx)("option",{className:"bg-[#F8A541] text-white","data-cy":"modal-add-priority-high",value:"high",children:"High"}),(0,l.jsx)("option",{className:"bg-[#00A790] text-white","data-cy":"modal-add-priority-medium",value:"medium",children:"Medium"}),(0,l.jsx)("option",{className:"bg-[#428BC1] text-white","data-cy":"modal-add-priority-low",value:"low",children:"Low"}),(0,l.jsx)("option",{className:"bg-[#8942C1] text-white","data-cy":"modal-add-priority-very-low",value:"very-low",children:"Very Low"})]})})]})]}),(0,l.jsx)("div",{className:"p-4 flex justify-end",children:(0,l.jsx)("button",{onClick:function(){o.Z.post("https://todo.api.devcode.gethired.id/todo-items",{activity_group_id:a,title:x,priority:""===g?"very-high":g,is_active:!0}).then((function(e){201===e.status&&t(!1),console.log(e)})).catch((function(e){console.log(e)}))},"data-cy":"modal-add-save-button",className:"bg-[#16ABF8] text-white font-semibold text-lg w-[150px] min-h-[54px] rounded-[45px]",children:"Simpan"})})]})})}}}]);
//# sourceMappingURL=869.f7750ecc.chunk.js.map