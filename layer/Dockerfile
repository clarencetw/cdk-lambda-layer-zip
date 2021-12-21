FROM public.ecr.aws/lambda/provided:latest

#
# versions
#

ARG TAR_VERSION=1.34
ARG GZIP_VERSION=1.11
ARG P7ZIP_VERSION=17.04

USER root
RUN mkdir -p /opt
WORKDIR /tmp

#
# tools
#

RUN yum update -y \
    && yum install -y make automake gcc gcc-c++ \
    && yum install -y zip unzip wget tar gzip

#
# tar
#

RUN wget https://ftp.gnu.org/gnu/tar/tar-${TAR_VERSION}.tar.gz
RUN tar -xzvf tar-${TAR_VERSION}.tar.gz
RUN cd tar-${TAR_VERSION} && FORCE_UNSAFE_CONFIGURE=1 ./configure --prefix=/opt && make && make install

#
# gzip
#

RUN wget https://ftp.gnu.org/gnu/gzip/gzip-${GZIP_VERSION}.tar.gz
RUN tar -xzvf gzip-${GZIP_VERSION}.tar.gz
RUN cd gzip-${GZIP_VERSION} && ./configure --prefix=/opt && make && make install

#
# p7zip
#

RUN wget https://github.com/jinfeihan57/p7zip/archive/v${P7ZIP_VERSION}/p7zip-${P7ZIP_VERSION}.tar.gz
RUN tar -xzvf p7zip-${P7ZIP_VERSION}.tar.gz
RUN sed '/^gzip/d' -i ./p7zip-${P7ZIP_VERSION}/install.sh
RUN sed -i '160a if(_buffer == nullptr || _size == _pos) return E_FAIL;' ./p7zip-${P7ZIP_VERSION}/CPP/7zip/Common/StreamObjects.cpp
RUN cd p7zip-${P7ZIP_VERSION} && make all3 && make DEST_HOME=/opt install

#
# create the bundle
#

RUN cd /opt \
    && zip --symlinks -r ../layer.zip * \
    && echo "/layer.zip is ready" \
    && ls -alh /layer.zip;

WORKDIR /
ENTRYPOINT [ "/bin/bash" ]
