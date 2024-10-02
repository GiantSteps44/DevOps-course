FROM amd64/ubuntu:latest

WORKDIR /app

RUN apt-get update && apt-get install -y python3 && apt-get install -y python3-pip \
&& apt-get install -y python3-venv

COPY . /app/

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

RUN pip3 install --no-cache-dir requests && pip3 install --no-cache-dir docker

CMD ["python3","./srv1.py"]