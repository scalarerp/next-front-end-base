import { appConfigName } from "@/lib/siteConfig";


export const APP_LOGOUT = `${appConfigName}_APP_LOGOUT`;

const event = new CustomEvent(APP_LOGOUT, {
  bubbles: true,
  cancelable: true,
  detail: {
    message: "Logout",
  },
});

export const dispatchLogout = () => {
  window.dispatchEvent(event);
};
