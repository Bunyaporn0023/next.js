// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useLanguage } from './components/compLanguageProvider_role_1'; 

i18n
  .use(initReactI18next)
  .init({
    resources: {
      EN: {
        translation: {
          Add: 'Add',
          "Work Owner": "Work Owner",
          'Report results': 'Report results',
          Evalution: 'Evalution',
          pass: 'pass',
          fail: 'fail',
          Details: 'Details',
          Inspector: 'Inspector',
          Yes: 'Yes',
          attachments: 'attachments',
          details: 'details',
          confirm: 'confirm',
          submit: 'submit',
          Join: 'Join',
          Phone: 'Phone',
          Line: 'Line',
          Email: 'Email',
          Name: 'Name',
          on: 'on',
          off: 'off',
          No: 'No',
          Add: 'Add',
          Cancel: 'Cancel',
          Activity: 'Activity',
          Edit: 'Edit',
          Profile: 'Profile',
          Plan: 'Plan',
          Meeting: 'Meeting',
          Topic: 'Topic',
          Status: 'Status',
          Location: 'Location',
          Date: 'Date',
          Employee: 'Employee',
          Examine: 'Examine',
          Submit: 'Submit',
          Notify: 'Notify',
          Response: 'Response',
          Approve: 'Approve',
          Position: 'Position',
          meeting:'meeting',
          Save:'Save',
          "Add Activity": "Add Activity",
          "dd/mm/yyyy": "dd/mm/yyyy",
          Phone: 'Phone',
          inspector: 'inspector',
          Overview: 'Overview',
          "Pending approval":"Pending approval",
          "fill in information":"fill in information",
          Lastname:'Lastname',
          Password:'Password',
          Confirm: 'Confirm',
          Selected:'Selected',
          "Select checklist":"Select checklist",
          User:'User',
          Checklist:'Checklist',
          "Add checklist":"Add checklist",
          "add checklist":"add checklist",
          "Do you want to delete":"Do you want to delete",
          send:'send',
          "Verified information":"Verified information",
          N:'',
          "add list examine":"add list examine",
          "Add list examine":"Add list examine",
          "Examine List":"Examine List",
          "Do you want to retrieve employee names?":"Do you want to retrieve employee names?",
          "Use employee list information":"Use employee list information",
          "?":"?",
          "add a photo":"add a photo",
          "Select an option":"Select an option",
          "Can be sent only one time. Are you sure you have checked?":"Can be sent only one time. Are you sure you have checked?",
          "Employee List":"Employee List",
          "The excel file consists of the columns employee , name , and lastname.":"The excel file consists of the columns employee , name , and lastname.",
          "Add employee list":"Add employee list",
          "add employee list from file":"add employee list from file",
          "log out":"log out",
          "Employee list":"Employee list",
          "Add Examine":"Add Examine",
          "add Examine":"add Examine",
          "add examine":"add examine",
          "Uploaded images":"Uploaded images",
          "There is no information to check today.":"There is no information to check today.",
          "Change your password":"Change your password",
          "New Password":"New Password",
          "Confirm password again":"Confirm password again",
          "Change your password":"Change your password",
          "Enter your email":"Enter your email",
          "Please enter the verification code sent to your email.":"Please enter the verification code sent to your email.",
          "No information":"No information",
          "Emergency notification":"Emergency notification",
          Time:'Time',
          "Session Expired":"Session Expired",
          "Please log in again":"Please log in again",
          OK:"OK",
          "Today's information has been sent":"Today's information has been sent",



        },
      },
      TH: {
        translation: {
          "Uploaded images":"รูปภาพที่อัพโหลด",
          "Add checklist":"เพิ่มรายการตรวจสอบ",
          "add checklist":"เพิ่มรายการตรวจสอบ",
          Checklist:'รายการตรวจสอบ',
          User:'รายชิ่อ',
          "Select checklist":"เลือกรายการตรวจสอบ",
          Selected:'เลือกแล้ว',
          Confirm: 'ยืนยัน',
          "dd/mm/yyyy": "ว/ด/ป",
          "Add Activity": "เพิ่มกิจกรรม",
          "Start Time": "เวลาเริ่ม" ,
          "End Time": "เวลาสิ้นสุด" ,
          Save:'บันทึก',
          Add: 'เพิ่ม',
          meeting:'ประชุม',
          "Work Owner": "ผู้ดูแล",
          Evalution: 'ประเมินผล',
          'Report results': 'ผลการรายงาน',
          pass: 'ผ่าน',
          fail: 'ไม่ผ่าน',
          Details: 'รายละเอียด',
          Inspector: 'ผู้ตรวจสอบ',
          Yes: 'ใช่',
          attachments: 'ไฟล์แนบ',
          details: 'รายละเอียด',
          submit: 'ส่ง',
          confirm: 'ยืนยัน',
          Join: 'เข้าร่วม',
          Phone: 'โทรศัพท์',
          Line: 'ไลน์',
          Email: 'อีเมล์',
          Name: 'ชื่อ',
          on: 'เปิด',
          off: 'ปิด',
          Add: 'เพิ่ม',
          Cancel: 'ยกเลิก',
          No: 'ลำดับ',
          Activity: 'ชื่อกิจกรรม',
          Edit: 'แก้ไข',
          Plan: 'แผนงาน',
          Meeting: 'ประชุม',
          Profile: 'โปรไฟล์',
          Topic: 'หัวข้อ',
          Status: 'สถานะ',
          Location: 'ที่ตั้ง',
          Date: 'วันที่',
          Employee: 'รหัสพนักงาน',
          Examine: 'ตรวจสอบ',
          Submit: 'ส่ง',
          Notify: 'แจ้งเตือน',
          Response: 'ผลแจ้งเตือน',
          Approve: 'อนุมัติ',
          Position: 'ตำแหน่ง',
          Phone: 'โทรศัพท์',
          inspector: 'ผู้ตรวจสอบ',
          Overview: 'รายการ',
          "Pending approval":"รอการอนุมัติ",
          "fill in information":"กรอกข้อมูล",
          Lastname:'นามสกุล',
          Password:'รหัสผ่าน',
          "Add Examine":"เพิ่มรายการตรวจสอบ",
          "add Examine":"เพิ่มรายการตรวจสอบ",
          "add examine":"เพิ่มรายการตรวจสอบ",
          "Do you want to delete":"คุณต้องการที่จะลบ",
          send:'ส่ง',
          "Verified information":"ข้อมูลตรวจสอบวันนี้",
            N:"น.",
            "add list examine":"เพิ่มรายการตรวจสอบ",
            "Add list examine":"เพิ่มรายการตรวจสอบ",
            "Examine List":"รายการตรวจสอบ",
            "Do you want to retrieve employee names?":"คุณต้องการเรียกข้อมูลชื่อพนักงานไหม ?",
          "Use employee list information":"ใช้ข้อมูลรายชื่อพนักงาน",
          "?":"ไหม ?",
          "add a photo":"เพิ่มรูปภาพ",
          "Select an option":"เลือกตัวเลือก",
          "Can be sent only one time. Are you sure you have checked?":"สามารถส่งได้เพียงครั้้งเดียวเท่านั้น คุณแน่ใจว่าตรวจสอบเรียบร้อยเเล้ว ?",
          "Employee List":"รายชื่อพนักงาน",
          "The excel file consists of the columns employee , name , and lastname.":"ในไฟล์ excel ประกอบด้วยคอลัมน์ employee , name , lastname",
          "Add employee list":"เพิ่มรายชื่อ",
          "add employee list from file":"เพิ่มรายชื่อจากไฟล์",
          "log out":"ออกจากระบบ",
          "Employee list":"รายชื่อพนักงาน",
          "There is no information to check today.":"ยังไม่มีข้อมูล",
          "Change your password":"เปลี่ยนรหัสผ่าน",
          "New Password":"รหัสผ่านใหม่",
          "Confirm password again":"ยืนยันรหัสผ่านอีกครั้ง",
          "Change your password":"เปลี่ยนรหัสผ่านของคุณ",
          "Enter your email":"กรอกอีเมล์ของคุณ",
          "Please enter the verification code sent to your email.":"กรุณากรอกรหัสยืนยันที่ส่งไปยังอีเมล์ของคุณ",
          "No information":"ไม่มีข้อมูล",
          "Emergency notification":"การแจ้งเหตุฉุกเฉิน",
          Time:'เวลา',
          "Session Expired":"เซสชั่นหมดอายุ",
          "Please log in again":"กรุณาเข้าสู่ระบบอีกครั้ง",
          OK:"ตกลง",
          "Today's information has been sent":"ข้อมูลวันนี้ได้ถูกส่งไปแล้ว",



        },
      },
    },
    lng: 'EN',
    fallbackLng: 'EN',
    interpolation: {
      escapeValue: false,
    },
  });


export default i18n;
