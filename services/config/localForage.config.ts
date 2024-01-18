
import { appConfigName } from "@/lib/siteConfig";
import localForage from "localforage";

localForage.config({
  name: appConfigName,
  storeName: `${appConfigName}_data`, // Should be alphanumeric, with underscores.
  description: `${appConfigName} database`,
});

export default localForage;
