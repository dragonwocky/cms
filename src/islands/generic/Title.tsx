const Title = (props) => {
  return (
    <h2
      classList={{
        "mt-8 text-xs text-neutral-500 dark:text-neutral-400": true,
        [props.class]: true,
      }}
    >
      {props.children}
    </h2>
  );
};

export { Title };
