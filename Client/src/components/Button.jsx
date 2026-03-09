export default function Button({
  children,
  type="button",
  variant="primary",
  onClick
}){

  const styles = {
    primary:"btn-primary",
    secondary:"btn-secondary"
  }

  return(

    <button
      type={type}
      onClick={onClick}
      className={styles[variant]}
    >

      {children}

    </button>

  )

}