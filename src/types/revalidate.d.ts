declare module 'revalidate' {
  export function createValidator(
    fn: (message: string) => (value: any) => string | undefined,
    message: string
  ): (value: any) => string | undefined;

  export function isRequired(config: { message: string } | string): (value: any) => string | undefined;
  export function composeValidators(...validators: any[]): any;
  export function combineValidators(validators: Record<string, any>): any;
}
