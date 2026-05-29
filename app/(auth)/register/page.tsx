import RegisterForm from "./components/RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <div className="flex justify-center pt-16 pb-8">
        <h1 className="text-head-01">Step Back</h1>
      </div>

      <div className="flex flex-col flex-1 p-8 gap-8">
        <RegisterForm />

        <div className="flex justify-center">
          <a href="/login" className="text-label-04">
            이미 계정이 있으신가요?{" "}
            <span className="underline">로그인하기</span>
          </a>
        </div>
      </div>
    </div>
  );
}
