import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  AjvBody,
  AjvParams,
  AjvQuery,
  Auth,
  Dto,
  PageQuery,
  SortQuery,
  UserContext,
} from '@common/decorators';
import { PageOptionDto } from '@common/dto';
import { QueryPipe } from '@common/pipes';
import { ControllerCore } from '@core/controller.core';

import { CreatePostDto, PostDto, QueryPostDto, UpdatePostDto } from './dto';
import { IPostService } from './interface';
import { PostInject } from './post.enum';
import { postSchema } from './post.schema';
import { PostCtx, PostQuery } from './post.type';

@ApiTags('Post')
@Controller('posts')
export class PostController extends ControllerCore {
  constructor(
    @Inject(PostInject.SERVICE)
    private readonly service: IPostService,
  ) {
    super();
  }

  @Post()
  @Dto(PostDto)
  @ApiResponse({ type: () => PostDto })
  @Auth()
  @ApiOperation({ summary: 'Create an post' })
  @ApiBody({ type: CreatePostDto })
  async create(
    @AjvBody(postSchema.create())
    body: CreatePostDto,
    @UserContext() user: UserPayload,
  ) {
    const data = await this.service.create(
      { ...body, authorId: user?.userId },
      { user },
    );

    return { data };
  }

  @Delete(':id')
  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an post by ID' })
  @ApiParam({ name: 'id ', required: true })
  async delete(
    @AjvParams(postSchema.getOne()) { id }: IdObject,
    @UserContext() user: UserPayload,
  ) {
    await this.service.delete({ id }, { user });
  }

  @Get()
  @Dto(PostDto)
  @ApiResponse({ type: () => PostDto })
  @ApiQuery({ type: QueryPostDto })
  @ApiOperation({ summary: 'Get list of posts' })
  async getList(
    @AjvQuery(postSchema.getList(), QueryPipe) query: PostQuery,
    @PageQuery() pagination: PageOptionDto,
    @SortQuery() sort: PostCtx['sort'],
    @UserContext() user?: UserPayload,
  ) {
    const [data, itemCount] = await this.service.getListAndCount(query, {
      ...pagination,
      sort,
      user,
    });

    return { data, itemCount, pagination };
  }

  @Get(':id')
  @Dto(PostDto)
  @ApiResponse({ type: () => PostDto })
  @ApiOperation({ summary: 'Get an post by ID' })
  @ApiParam({ name: 'id', required: true })
  async getOne(
    @AjvParams(postSchema.getOne()) { id }: IdObject,
    @UserContext() user?: UserPayload,
  ) {
    const data = await this.service.getOneWithException({ id }, { user });

    return { data };
  }

  @Put(':id')
  @Dto(PostDto)
  @ApiResponse({ type: () => PostDto })
  @Auth()
  @ApiOperation({ summary: 'Update an post' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdatePostDto })
  async update(
    @AjvParams(postSchema.getOne()) query: IdObject,
    @AjvBody(postSchema.update())
    body: UpdatePostDto,
    @UserContext() user: UserPayload,
  ) {
    const data = await this.service.update(query, body, { user });

    return { data };
  }
}
