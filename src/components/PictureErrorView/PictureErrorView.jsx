export default function PictureErrorView({ message }) {
  return (
    <div>
      <img
        src="https://img.pravda.ru/image/article/9/5/5/400955.jpeg"
        width="240"
        alt="черепаха"
      />
      <p>{message}</p>
    </div>
  );
}
