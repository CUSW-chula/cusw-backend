import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    example: 0,
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
  })
  title: string;

  @ApiProperty({
    example: 'johndoe@example.com',
  })
  content: string;

  @ApiProperty({
    example: 1,
  })
  userId: number;
}
