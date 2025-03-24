import { RecordsWrapper } from "./record.style";

function Records(props, name) {
  const downloadFile = (uri) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <RecordsWrapper>
      {props.records?.length ? (
        props.records.map((record) => {
          if (!record.fileurl) return;
          var filename = null;
          try {
            filename = new URL(record.fileurl)?.pathname?.replace(
              "/contents/",
              ""
            );
          } catch (err) {
            return null;
          }
          return (
            <div
              className="record"
              onClick={() => downloadFile(record.fileurl, filename)}
            >
              <b>{record.documentType}</b>
              <p>{decodeURIComponent(filename)}</p>
              <span>{new Date(record.createdAt).toDateString()}</span>
            </div>
          );
        })
      ) : (
        <p className="no-records">No Records</p>
      )}
    </RecordsWrapper>
  );
}

export default Records;
