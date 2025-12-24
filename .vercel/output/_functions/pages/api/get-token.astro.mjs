import { h as handleOptionsRequest, c as createCorsResponse } from '../../chunks/cors_BYRJwiQn.mjs';
import { V as ValidUser, g as getUserByEmail, v as verifyPassword, a as getTokenByUserId } from '../../chunks/dataValidation_XEGlMNFt.mjs';
import { C as CustomError, c as createToken } from '../../chunks/CustomError_CAa_Qado.mjs';
export { renderers } from '../../renderers.mjs';

const getToken = async (email, password) => {
  const isUserValid = ValidUser.safeParse({ email, password });
  if (!isUserValid.success) {
    throw new CustomError(
      isUserValid.error.issues[0].message,
      400,
      "Bad Request"
    );
  }
  const user = await getUserByEmail(email);
  if (!user) throw new CustomError("User not found", 404, "Not Found");
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) throw new CustomError("Invalid password", 401, "Unauthorized");
  const existingToken = await getTokenByUserId(user.id);
  if (existingToken) {
    const expirationDate = new Date(existingToken.expiration_date);
    const currentDate = /* @__PURE__ */ new Date();
    if (currentDate < expirationDate) {
      return {
        token: existingToken.token,
        expiration_date: existingToken.expiration_date,
        status: "existing_valid_token"
      };
    }
  }
  const newToken = await createToken(email, user.id);
  return {
    token: newToken.token,
    expiration_date: newToken.expiration_date,
    status: existingToken ? "token_renewed" : "new_token_created"
  };
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
    const token = await getToken(email, password);
    return createCorsResponse(JSON.stringify(token), 200);
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
