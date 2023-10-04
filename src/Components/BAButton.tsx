type propsType = {
    label: string;
    onClick?: any;
  };
  
  export default function BAButton(props: propsType) {
    const { label, onClick } = props;
    return (
      <button
        onClick={onClick}
        className="rounded bg-teal-600 py-2 w-32 drop-shadow-2xl text-white "
      >
        {label}
      </button>
    );
  }