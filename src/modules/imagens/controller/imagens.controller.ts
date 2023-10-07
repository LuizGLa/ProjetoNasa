import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpException,
  Logger,
  BadRequestException,
  Req,
  Res,
} from '@nestjs/common';
import { ImagensService } from '../service/imagens.service';
import { CreateImagemDto } from '../dto/create-imagem.dto';
import { UpdateImagenDto } from '../dto/update-imagem.dto';
import { use } from 'passport';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { Response } from 'express';

@Controller('imagens')
export class ImagensController {
  constructor(private readonly imagensService: ImagensService,
    private readonly logger: Logger,
    private readonly configService: ConfigService
    ) {}

  //Upload de arquivos referentes a brecho no servidor - Retorna o link
  @Post('/file')
  // @Roles(Role.ADMIN, Role.USER)
  // @UseGuards(AuthGuard(), RolesGuard)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/' + process.env.FILE_PATH,
      filename: (req, file, callback) => {
        
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const nome = file.originalname.split(".")[0].normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
        const ext = extname(file.originalname);
        const sufixoUnico = Date.now() + Math.round(Math.random() * 1e9);
        const nomeDoArquivo = `${req.baseUrl}${nome}_${sufixoUnico}${ext}`;
   
        if(allowedExtensions.includes(ext)){
          callback(null, nomeDoArquivo.replace(/\s+/g, ''));
        }else{
          callback(new HttpException('Falha na validacao, arquivo nao é uma imagem',403),null);
        }
        
      }
    })
  }))
   
  async handleUpload( @UploadedFile() file: Express.Multer.File, @Body() body: any) {
  console.log(body);
  console.log(file);
  

    if(!file ){
      this.logger.error('erro: Arquivo não é permitido ', {logId: 'controller.arquivos.controller.handleUpload'});
      throw new  BadRequestException('Arquivo não é permitido');
    } else {
      const response = {
        nome: file.filename,
        capa: !!JSON.parse(body.capa.toLowerCase()),
        projeprojetoId: body.projeprojetoId,
        link: `${this.configService.get<string>('FILE_URL')}${file.filename}`
        
      }
      console.log("response",response);
      
      // return await this.imagensService.salvarImagem(response);
    }
  }

  //Busca o arquivo no servidor pelo link (filename). Rota acessível à todos
  @Get('/file/:filename')
  async getFile(@Param('filename') filename, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads/' + process.env.FILE_PATH });
  }
  
  @Get()
  async buscarTodos() {
    return await this.imagensService.buscarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.imagensService.buscarPorId(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const arquivoExcluido =  await this.imagensService.excluirImagem(id);
    console.log('arquivoExcluido');
    
    
    const { nome } = arquivoExcluido;
    const fileName = nome;
    fs.unlink(`uploads/${process.env.FILE_PATH}/`+fileName, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });

    return arquivoExcluido;
  }
}
