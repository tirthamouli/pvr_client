export const rulesMixin = {
  data() {
    return {
      /**
       * Check if empty
       */
      anyTextRule: [
        v => {
          return v.trim().length > 0 || "Please enter some text";
        }
      ],
      /**
       * Name verification rule
       */
      nameRule: [
        v => {
          return (
            /^[a-z]{3,}$/i.test(v) === true ||
            "Please enter a valid name. Greater than 3 characters and no numbers"
          );
        }
      ],
      /**
       * Email verification rule
       */
      emailRule: [
        v => {
          return (
            /^([a-z0-9.-_%+]+)@([a-z0-9-]+)\.([a-z]{2,10})(\.[a-z]{2,5})?$/i.test(
              v
            ) === true || "Please enter a valid email"
          );
        }
      ],
      /**
       * Name input rule
       */
      relaxedNameRule: [
        v => {
          return /^[a-z0-9_+\- ]+$/i.test(v) || "Not a valid input";
        }
      ],
      /**
       * Username rules for username
       */
      usernameRule: [
        v => {
          return (
            /^[a-z0-9_]{3,}$/i.test(v) === true ||
            "Username can only have letters and numbers. Minimum length is 3"
          );
        }
      ],
      /**
       * Password rules
       */
      passwordRule: [
        v => {
          return (
            /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/.test(
              v
            ) === true ||
            "Minimum length is 8, must contain uppercase, lowercase, number and special chars !@#%&"
          );
        }
      ],
      /**
       * Repeat password rules
       */
      repeatPasswordRule: [
        v => {
          return (
            v === this.password ||
            "Repeat password must be the same as password"
          );
        }
      ]
    };
  }
};
