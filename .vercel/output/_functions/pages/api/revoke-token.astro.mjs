import { h as handleOptionsRequest, c as createCorsResponse } from '../../chunks/cors_BYRJwiQn.mjs';
import { V as ValidUser, g as getUserByEmail, v as verifyPassword } from '../../chunks/dataValidation_XEGlMNFt.mjs';
import { C as CustomError, g as getTokenFromUser, d as deleteToken } from '../../chunks/CustomError_CAa_Qado.mjs';
export { renderers } from '../../renderers.mjs';

const revokeToken = async (email, password) => {
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
  const token = await getTokenFromUser(user.id);
  if (!token) throw new CustomError("Token not found", 404, "Not Found");
  await deleteToken(token);
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
    await revokeToken(email, password);
    return createCorsResponse(
      JSON.stringify({ success: "Token was deleted" }),
      200
    );
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
