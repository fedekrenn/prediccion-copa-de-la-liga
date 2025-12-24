import { V as ValidUser, g as getUserByEmail, b as addUser } from '../../chunks/dataValidation_XEGlMNFt.mjs';
import { C as CustomError, c as createToken } from '../../chunks/CustomError_CAa_Qado.mjs';
import { h as handleOptionsRequest, c as createCorsResponse } from '../../chunks/cors_BYRJwiQn.mjs';
export { renderers } from '../../renderers.mjs';

const register = async (email, password) => {
  const isUserValid = ValidUser.safeParse({ email, password });
  if (!isUserValid.success) {
    throw new CustomError(
      isUserValid.error.issues[0].message,
      400,
      "Bad Request"
    );
  }
  const user = await getUserByEmail(email);
  if (user) throw new CustomError("User already exists", 400, "Bad Request");
  const addedUser = await addUser(isUserValid.data);
  const { token, expiration_date } = await createToken(email, addedUser.id);
  return { ...addedUser, token, expiration_date };
};

const OPTIONS = async () => handleOptionsRequest();
const POST = async ({ request }) => {
  const { email, password } = await request.json();
  if (!email || !password) {
    return createCorsResponse(
      JSON.stringify({ error: "Email and password are required" }),
      400
    );
  }
  try {
    const addedUser = await register(email, password);
    return createCorsResponse(JSON.stringify(addedUser), 201);
  } catch (error) {
    return createCorsResponse(
      JSON.stringify({ error: error.message }),
      error.status || 500
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  OPTIONS,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
