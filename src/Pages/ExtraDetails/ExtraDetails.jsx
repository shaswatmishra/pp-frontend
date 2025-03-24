import Ellipse from "../../Assets/Ellipse.svg";
import PractcePlusLogo from "../../Assets/PracticePlusLogo.svg";
import LabReportSvg from "../../Assets/labrepo.svg";
import PrescriptionSvg from "../../Assets/Prescription.svg";
import DocumentSvg from "../../Assets/Document.svg";

import { ExtraDetailsWrapper } from "./ExtraDetails.style";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Appointments } from "../../Api/Api";
import { useState } from "react";
import Loader from "../../Components/Loading/ExportLoader";

function ExportDetails() {
  const params = useParams("consultantId");

  const [loading, setLoading] = useState(true);

  const uploadFile = async (e) => {
    try {
      if (loading.status) return;

      setLoading({ status: true, message: "" });
      const file = e.target.files[0];
      if (!file) throw { message: "Please upload file!" };

      //get signed url
      const res = await axios.post(
        Appointments.addFile(params.consultantId),
        {
          filetype: file.type,
          filename: file.name,
          fieldname: e.target.name,
        },
        {
          headers: {
            "content-type": "application/json",
          },
          validateStatus: () => true,
        }
      );

      if (res.data.status !== "success") throw { message: res.data.message };

      await axios.put(res.data.data.signedURL, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      //activate file
      const finalRes = await axios.get(
        Appointments.activateFile(
          params.consultantId,
          res.data.data.record._id
        ),
        {
          validateStatus: () => true,
        }
      );
      if (finalRes.data.status !== "success")
        throw { message: finalRes.data.message };

      alert(`${e.target.name} uploaded successfully!`);
    } catch (err) {
      alert(err.message);
    }
    setLoading({ status: false, message: "" });
  };

  return (
    <ExtraDetailsWrapper>
      <img className="ellipse" src={Ellipse} alt="ellipse" />
      <img className="logo" src={PractcePlusLogo} alt="pp-logo" />

      <div className="file-head">
        <h1>Add Relevant Files</h1>
        <p>Ex . Past report, Xrays</p>
      </div>

      <div className="upload-options">
        <div className="file-input">
          <img src={LabReportSvg} alt="lab report svg" />
          <input onChange={uploadFile} name="labreport" type="file" />
        </div>
        <div className="file-input">
          <img src={PrescriptionSvg} alt="prescription svg" />
          <input onChange={uploadFile} name="prescription" type="file" />
        </div>
        <div className="file-input">
          <img src={DocumentSvg} alt="document svg" />
          <input onChange={uploadFile} name="other" type="file" />
        </div>
      </div>

      {loading.status ? <Loader text={loading.message} /> : ""}
    </ExtraDetailsWrapper>
  );
}

export default ExportDetails;
