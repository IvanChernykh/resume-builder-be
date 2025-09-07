/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';

export function ApiProperties() {
  return function (target: any) {
    const properties = Object.getOwnPropertyNames(new target());

    properties.forEach((property) => {
      const type = Reflect.getMetadata(
        'design:type',
        target.prototype,
        property,
      );
      ApiProperty({ type })(target.prototype, property);
    });
  };
}
