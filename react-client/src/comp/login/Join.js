/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const Join = () => {
  return (
    <div className="w-3/5 m-auto">
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                회원가입
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      이메일주소
                    </label>
                    <input
                      type="email"
                      name="username"
                      id="username"
                      className="mt-1 p-4 w-1/2 m-auto block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="nickname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      닉네임
                    </label>
                    <input
                      type="text"
                      name="nickname"
                      id="nickname"
                      className="mt-1 p-4 w-1/2 m-auto block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      비밀번호
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="mt-1 p-4 w-1/2 m-auto block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="re_password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      비밀번호 확인
                    </label>
                    <input
                      type="password"
                      name="re_password"
                      id="re_password"
                      className="mt-1 p-4 w-1/2 m-auto block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="birthdate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      생년월일
                    </label>
                    <input
                      type="month"
                      name="birthdate"
                      id="birthdate"
                      className="mt-1 p-4 w-1/2 m-auto block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  가입하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Join;
