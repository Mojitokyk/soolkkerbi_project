import "./inputFrm.css";

const InputTitle = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content; /*? */
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
        content={content}
        onChange={changeValue}
        onBlur={blurEvent}
        placeholder="제목을 입력하세요."
        autoComplete="off"
      ></input>
    </>
  );
};
export default InputTitle;
