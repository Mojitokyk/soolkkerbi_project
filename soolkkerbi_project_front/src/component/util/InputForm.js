import "./inputFrm.css";

const Input = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const blurEvent = props.blurEvent;
  const changeValue = (e) => {
    const inputValue = e.currentTarget.value;
    setData(inputValue);
  };
  return (
    <>
      <input
        className="input-form"
        type={type}
        value={data || ""}
        id={content}
        onChange={changeValue}
        onBlur={blurEvent}
      ></input>
    </>
  );
};
export default Input;
