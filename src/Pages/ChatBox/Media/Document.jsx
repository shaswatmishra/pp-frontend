function Document(props) {
  const downloadFile = (name, url) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`text ${props.status || ""}`}
      onClick={downloadFile(props.fileurl, props.filename)}
    >
      <p>{props.filename}</p>
    </div>
  );
}

export default Document;
