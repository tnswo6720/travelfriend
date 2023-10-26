import { useRouter } from "next/router";
import LayoutHeaderUI from "./LayoutHeader.presenter";

export default function LayoutHeader(): JSX.Element {
  const router = useRouter();

  const onClickLogo = (): void => {
    void router.push("/boards");
  };

  const handleClick = (): void => {
    void router.push("/"); // 메인 페이지로 이동
  };

  const onClickMoveToLogin = (): void => {
    void router.push("/login");
  };
  const onClickMoveToSignup = (): void => {
    void router.push("/SignUp");
  };

  return (
    <LayoutHeaderUI
      onClickLogo={onClickLogo}
      onClickMoveToLogin={onClickMoveToLogin}
      onClickMovetoSignUp={onClickMoveToSignup}
      onClickMainPage={handleClick}
    />
  );
}
