uniform sampler2D paperTexture;
uniform vec3 colour1;
uniform vec3 colour2;

varying vec2 vertexUV;

void main() {
  vec3 gradient = mix(colour1, colour2, vertexUV.y);
  vec3 texture = gradient * texture2D(paperTexture, vertexUV).xyz;
  gl_FragColor = vec4(texture, 1);
}